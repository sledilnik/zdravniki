import { createContext, useContext, useEffect, useState } from 'react';
import { CSV_URL } from 'const';
import useFetchAndParseCsv from '../hooks/useFetchAndParseCsv';
import { createDoctors } from 'services';
import { fromArrayWithHeader } from 'utils';

const DoctorsContext = createContext({});

export const DoctorsConsumer = DoctorsContext.Consumer;

function DoctorsProvider({ children }) {
  const [doctors, setDoctors] = useState(null);
  const [dicts, setDicts] = useState({ doctors: null, institutions: null, types: null });

  const _institutions = useFetchAndParseCsv(CSV_URL.INSTITUTIONS);
  const _doctorTypes = useFetchAndParseCsv(CSV_URL.DOCTOR_TYPES);
  const _doctors = useFetchAndParseCsv(CSV_URL.DOCTORS);

  const isFetching = _doctors.isFetching || _institutions.isFetching || _doctorTypes.isFetching;
  const errors = [_doctors.error, _institutions.error, _doctorTypes.error];
  const doctorsFetched =
    (!!_doctors.parsed || _doctors.error) &&
    (!!_institutions.parsed || _institutions.error) &&
    (!!_doctorTypes.parsed || _doctorTypes.error);

  useEffect(() => {
    if (doctorsFetched) {
      const doctorsDict = fromArrayWithHeader(_doctors.parsed);
      const institutionsDict = fromArrayWithHeader(_institutions.parsed);
      const typesDict = fromArrayWithHeader(_doctorTypes.parsed);

      setDoctors(createDoctors(doctorsDict, institutionsDict, typesDict));
      setDicts({ doctors: doctorsDict, institutions: institutionsDict, types: typesDict });
    }
  }, [_doctorTypes.parsed, _doctors.parsed, _institutions.parsed, doctorsFetched]);

  return (
    <DoctorsContext.Provider value={{ isFetching, errors, doctors, dicts }}>
      {children}
    </DoctorsContext.Provider>
  );
}

function useDoctors() {
  const context = useContext(DoctorsContext);
  if (!context) {
    throw new Error(`useDoctors must be used within a DoctorsProvider`);
  }
  return context;
}

export { DoctorsProvider, useDoctors };
