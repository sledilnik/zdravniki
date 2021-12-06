import { createContext, useCallback, useContext, useState, useEffect, useMemo } from 'react';
import { useDoctors } from './doctorsContext';

const FilterContext = createContext();

export const FilterConsumer = FilterContext.Consumer;

const FilterProvider = function FilterProvider({ children }) {
  const { doctors: _doctors } = useDoctors();

  const [doctorType, setDoctorType] = useState('gp');
  const [accept, setAccept] = useState('vsi');
  const [searchValue, setSearchValue] = useState('');

  const [doctors, setDoctors] = useState(_doctors);
  const [filtered, setFiltered] = useState(null);

  const setFilteredDoctors = useCallback(() => {
    if (!filtered) {
      return;
    }

    if (!searchValue) setDoctors(filtered);

    if (searchValue) {
      const compare = doctor =>
        doctor.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        doctor.searchAddress.toLowerCase().includes(searchValue.toLowerCase()) ||
        doctor.provider.toLowerCase().includes(searchValue.toLowerCase());
      const combined = filtered.filter(compare);

      setDoctors(combined);
    }
  }, [filtered, searchValue]);

  const memoFiltered = useMemo(
    () => _doctors?.filter(doctorType, accept),
    [accept, doctorType, _doctors],
  );

  useEffect(() => {
    if (!memoFiltered) {
      return;
    }

    setFiltered(memoFiltered);
  }, [memoFiltered]);

  useEffect(() => {
    setFilteredDoctors();
  }, [setFilteredDoctors]);

  const value = useMemo(
    () => ({
      doctors,
      setDoctors,
      doctorType,
      setDoctorType,
      accept,
      setAccept,
      searchValue,
      setSearchValue,
      get allDoctors() {
        return filtered;
      },
    }),
    [accept, doctorType, doctors, filtered, searchValue],
  );
  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};

function useFilter() {
  const context = useContext(FilterContext);

  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}

export { FilterProvider, useFilter };
