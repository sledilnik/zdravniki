import { createContext, useContext } from 'react';
import { url } from '../constants';
import useFetchAndParseCsv from '../hooks/useFetchAndParseCsv';
import { createDoctors } from '../services';

const DoctorsContext = createContext({});

export const DoctorsConsumer = DoctorsContext.Consumer;

function DoctorsProvider({ children }) {
  const _doctors = useFetchAndParseCsv(url.DOCTORS_URL);
  const _gyno = useFetchAndParseCsv(url.GYNAECOLOGISTS_URL);
  const _dentists = useFetchAndParseCsv(url.DENTISTS_URL);

  const doctors = _doctors.parsed && createDoctors(_doctors.parsed, 'zdravnik');
  const gyno = _doctors.parsed && createDoctors(_gyno.parsed, 'zdravnik');
  const dentists = _doctors.parsed && createDoctors(_dentists.parsed, 'zdravnik');

  return (
    <DoctorsContext.Provider value={{ doctors, gyno, dentists }}>
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
