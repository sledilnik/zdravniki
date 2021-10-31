import { createContext, useContext, useEffect, useState } from 'react';
import { APP_URL } from 'const';
import useFetchAndParseCsv from '../hooks/useFetchAndParseCsv';
import { createDoctors } from '../services';

const DoctorsContext = createContext({});

export const DoctorsConsumer = DoctorsContext.Consumer;

function DoctorsProvider({ children }) {
  const [all, setAll] = useState({ doctors: null, gyno: null, dentists: null });

  const _doctors = useFetchAndParseCsv(APP_URL.DOCTORS);
  const _gyno = useFetchAndParseCsv(APP_URL.GYNAECOLOGISTS);
  const _dentists = useFetchAndParseCsv(APP_URL.DENTISTS);
  const isFetching = _doctors.isFetching || _gyno.isFetching || _dentists.isFetching;
  const errors = [_doctors.error, _gyno.error, _dentists.error];
  const doctorsFetched =
    (!!_doctors.parsed || _doctors.error) &&
    (!!_gyno.parsed || _gyno.error) &&
    (!!_dentists.parsed || _dentists.error);

  useEffect(() => {
    doctorsFetched &&
      setAll({
        doctors: isFetching && !_doctors.error ? null : createDoctors(_doctors.parsed, 'zdravnik'),
        gyno: isFetching && !_gyno.error ? null : createDoctors(_gyno.parsed, 'ginekolog'),
        dentists:
          isFetching && !_dentists.error ? null : createDoctors(_dentists.parsed, 'zobozdravnik'),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctorsFetched]);

  return (
    <DoctorsContext.Provider value={{ isFetching, errors, ...all }}>
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
