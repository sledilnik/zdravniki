import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useDoctors } from './doctorsContext';
import { useDebounce } from 'hooks';

const DoctorsByTypeContext = createContext();

export const DoctorsByTypeConsumer = DoctorsByTypeContext.Consumer;

function DoctorsByTypeProvider({ children }) {
  const [doctorType, setDoctorType] = useState('doctors');
  const [searchValue, setSearchValue] = useState('');

  const allDoctors = useDoctors();
  const _doctors = useMemo(() => allDoctors[doctorType], [allDoctors, doctorType]);
  const [doctors, setDoctors] = useState(_doctors);

  const setFilteredDoctors = useCallback(() => {
    !searchValue && setDoctors(_doctors);
    searchValue &&
      setDoctors(_doctors.filter(doctor => doctor.name.includes(searchValue.toUpperCase())));
  }, [searchValue, _doctors]);

  useDebounce(() => setFilteredDoctors(), 700, [searchValue, _doctors]);

  const value = { doctors, setDoctors, doctorType, setDoctorType, searchValue, setSearchValue };

  return <DoctorsByTypeContext.Provider value={value}>{children}</DoctorsByTypeContext.Provider>;
}

function useDoctorsByType() {
  const context = useContext(DoctorsByTypeContext);

  if (!context) {
    throw new Error('useDoctorsByType must be used within a DoctorTypeProvider');
  }
  return context;
}

export { DoctorsByTypeProvider, useDoctorsByType };
