import { createContext, useContext } from 'react';
import { APP_URL } from '../constants';
import useFetchAndParseCsv from '../hooks/useFetchAndParseCsv';
import { createDoctors } from '../services';

const DoctorsContext = createContext({});

export const DoctorsConsumer = DoctorsContext.Consumer;

function DoctorsProvider({ children }) {
  const _doctors = useFetchAndParseCsv(APP_URL.DOCTORS_URL);
  const _gyno = useFetchAndParseCsv(APP_URL.GYNAECOLOGISTS_URL);
  const _dentists = useFetchAndParseCsv(APP_URL.DENTISTS_URL);

  const doctors = _doctors.parsed && createDoctors(_doctors.parsed, 'zdravnik');
  const gyno = _gyno.parsed && createDoctors(_gyno.parsed, 'ginekolog');
  const dentists = _dentists.parsed && createDoctors(_dentists.parsed, 'zobozdravnik');

  const isFetching = _doctors.isFetching || _gyno.isFetching || _dentists.isFetching;
  const errors = [_doctors.error, _gyno.error, _dentists.error];

  return (
    <DoctorsContext.Provider value={{ isFetching, errors, doctors, gyno, dentists }}>
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
