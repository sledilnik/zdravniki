import { create } from 'zustand';

const useFilterStore = create(set => ({
  filterState: {
    municipalities: [],
    doctorType: 'gp',
    year: '2023',
  },
  setFilterState: (name, value) =>
    set(state => ({
      filterState: {
        ...state.filterState,
        [name]: value,
      },
    })),
}));

export default useFilterStore;
