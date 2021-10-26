import { createContext, useCallback, useContext, useMemo, useState, useEffect } from 'react';
import { useDoctors } from './doctorsContext';
import { useDebounce } from 'hooks';

const FilterContext = createContext();

export const FilterConsumer = FilterContext.Consumer;

function FilterProvider({ children }) {
  const [doctorType, setDoctorType] = useState('doctors');
  const [accept, setAccept] = useState('sprejema');
  const [searchValue, setSearchValue] = useState('');

  const allDoctors = useDoctors();

  const _doctorsByType = useMemo(() => allDoctors[doctorType], [allDoctors, doctorType]);
  const _doctorsByAccept = useMemo(
    () =>
      accept === 'vsi'
        ? _doctorsByType
        : _doctorsByType?.filter(doctor => accept === doctor.acceptText),
    [_doctorsByType, accept],
  );

  const [doctors, setDoctors] = useState(_doctorsByType);

  const setFilteredDoctors = useCallback(() => {
    !searchValue && setDoctors(_doctorsByAccept);
    searchValue &&
      setDoctors(
        _doctorsByAccept.filter(doctor => doctor.name.includes(searchValue.toUpperCase())),
      );
  }, [searchValue, _doctorsByAccept]);

  useEffect(() => setFilteredDoctors(), [setFilteredDoctors]);

  useDebounce(() => setFilteredDoctors(), 700, [searchValue, _doctorsByType]);

  const value = {
    doctors,
    setDoctors,
    doctorType,
    setDoctorType,
    accept,
    setAccept,
    searchValue,
    setSearchValue,
  };

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
