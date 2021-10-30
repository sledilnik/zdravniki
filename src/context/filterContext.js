import { createContext, useCallback, useContext, useMemo, useState, useEffect } from 'react';
import { useDoctors } from './doctorsContext';
import { useDebounce } from 'hooks';

const FilterContext = createContext();

const doctorsType = ['doctors', 'gyno', 'dentists'];

export const FilterConsumer = FilterContext.Consumer;

function FilterProvider({ children }) {
  const { errors, ...allDoctors } = useDoctors();

  let indexType = null;
  errors.forEach((error, index) => {
    if (!error) {
      indexType = indexType ?? index;
    }
  });

  const [doctorType, setDoctorType] = useState(doctorsType[indexType]);
  const [accept, setAccept] = useState('sprejema');
  const [searchValue, setSearchValue] = useState('');
  const [ids, setIds] = useState([]);

  const _doctorsByType = useMemo(() => allDoctors[doctorType], [allDoctors, doctorType]);
  const _doctorsByAccept = useMemo(
    () =>
      accept === 'vsi'
        ? _doctorsByType
        : _doctorsByType?.filter(doctor => accept === doctor.acceptText),
    [_doctorsByType, accept],
  );

  const [doctors, setDoctors] = useState(_doctorsByAccept);

  const isByIds = ids.length > 0;

  const setFilteredDoctors = useCallback(() => {
    !searchValue && !isByIds && setDoctors(_doctorsByAccept);

    if (isByIds) {
      searchValue && setSearchValue('');

      const doctorsById = _doctorsByType.filter(doctor => ids.includes(doctor.id));
      setDoctors(doctorsById);
    }

    if (searchValue) {
      const compareName = doctor => doctor.name.includes(searchValue.toUpperCase());
      const comapreAddress = doctor => doctor.fullAddress.includes(searchValue.toUpperCase());

      const byName = _doctorsByAccept?.filter(compareName) ?? [];
      const byAddress = _doctorsByAccept?.filter(comapreAddress) ?? [];

      const combined = [...byName];

      byAddress.forEach(item => {
        const oldDoctor = byName.find(doctor => doctor.id === item.id);
        !oldDoctor && combined.push(item);
      });

      setDoctors(combined);
    }
  }, [searchValue, _doctorsByAccept, ids, isByIds, _doctorsByType]);

  useDebounce(() => setFilteredDoctors(), 500, [searchValue]);

  useEffect(() => {
    setFilteredDoctors();
  }, [setFilteredDoctors]);

  const value = {
    doctors,
    setDoctors,
    doctorType,
    setDoctorType,
    accept,
    setAccept,
    searchValue,
    setSearchValue,
    ids,
    setIds,
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
