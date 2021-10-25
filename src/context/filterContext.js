import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useDoctors } from './doctorsContext';
import { useDebounce } from 'hooks';

const FilterContext = createContext();

export const FilterConsumer = FilterContext.Consumer;

function FilterProvider({ children }) {
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

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}

function useFilter() {
  const context = useContext(FilterContext);

  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}

export { FilterProvider, useFilter };
