import { createContext, useCallback, useContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { filterBySearchValueInMapBounds } from '../utils';
import { useDoctors } from './doctorsContext';
import { useLeafletContext } from './leafletContext';

const FilterContext = createContext();

export const FilterConsumer = FilterContext.Consumer;

const FilterProvider = function FilterProvider({ children }) {
  const { map } = useLeafletContext();
  const { doctors: _doctors } = useDoctors();

  const [doctorType, setDoctorType] = useState('gp');
  const [accept, setAccept] = useState('vsi');
  const [searchValue, setSearchValue] = useState('');

  const [doctors, setDoctors] = useState(_doctors);
  const [filtered, setFiltered] = useState(null);

  const setFilteredDoctors = useCallback(() => {
    const bounds = map?.getBounds();
    if (!filtered || !bounds) {
      return;
    }

    const mapDoctors = filterBySearchValueInMapBounds({ searchValue, filtered, bounds });
    setDoctors(mapDoctors);
  }, [filtered, searchValue, map]);

  const memoFiltered = useMemo(
    () => _doctors?.filterByTypeAndAccepts(doctorType, accept),
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

FilterProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export { FilterProvider, useFilter };
