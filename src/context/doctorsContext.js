import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { CSV_URL } from 'const';
import { createDoctors } from 'services';
import { fromArrayWithHeader } from 'utils';
import useFetchAndParseCsv from '../hooks/useFetchAndParseCsv';

const DoctorsContext = createContext({});

export const DoctorsConsumer = DoctorsContext.Consumer;

const DoctorsProvider = function DoctorsProvider({ children }) {
  const [doctors, setDoctors] = useState(null);
  const [dicts, setDicts] = useState({ doctors: null, institutions: null, types: null });

  const institutionsRequest = useFetchAndParseCsv(CSV_URL.INSTITUTIONS);
  const doctorTypesRequest = useFetchAndParseCsv(CSV_URL.DOCTOR_TYPES);
  const doctorsRequest = useFetchAndParseCsv(CSV_URL.DOCTORS);

  const isFetching =
    doctorsRequest.isFetching || institutionsRequest.isFetching || doctorTypesRequest.isFetching;
  const errors = useMemo(
    () => [doctorsRequest.error, institutionsRequest.error, doctorTypesRequest.error],
    [doctorTypesRequest.error, doctorsRequest.error, institutionsRequest.error],
  );

  const doctorsFetched =
    (!!doctorsRequest.parsed || doctorsRequest.error) &&
    (!!institutionsRequest.parsed || institutionsRequest.error) &&
    (!!doctorTypesRequest.parsed || doctorTypesRequest.error);

  useEffect(() => {
    if (doctorsFetched) {
      const doctorsDict = fromArrayWithHeader(doctorsRequest.parsed);
      const institutionsDict = fromArrayWithHeader(institutionsRequest.parsed, 'id_inst');
      const typesDict = fromArrayWithHeader(doctorTypesRequest.parsed, 'id');

      setDoctors(
        createDoctors({
          doctorsDict,
          institutionsDict,
          typesDict,
          keys: { instKey: 'id_inst', typeKey: 'type' },
        }),
      );
      setDicts({ doctors: doctorsDict, institutions: institutionsDict, types: typesDict });
    }
  }, [
    doctorTypesRequest.parsed,
    doctorsRequest.parsed,
    institutionsRequest.parsed,
    doctorsFetched,
  ]);

  const value = useMemo(
    () => ({ isFetching, errors, doctors, dicts }),
    [dicts, doctors, errors, isFetching],
  );
  return <DoctorsContext.Provider value={value}>{children}</DoctorsContext.Provider>;
};

function useDoctors() {
  const context = useContext(DoctorsContext);
  if (!context) {
    throw new Error(`useDoctors must be used within a DoctorsProvider`);
  }
  return context;
}

export { DoctorsProvider, useDoctors };
