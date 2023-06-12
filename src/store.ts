import {create} from 'zustand';

export interface filterState {
    filters: Set<string>,
    addFilter: (value: string) => void,
    removeFilter: (value: string) => void,
    removeAllFilters: () => void
}

export const useFilters = create(set => ({
  filters: window.localStorage.getItem('filters') ?
    new Set(JSON.parse(window.localStorage.getItem('filters') || '')) :
    new Set(),
  addFilter: (value: string) => {
    set((state: filterState) => {
      return {filters: new Set(state.filters).add(value)}
    });
  },
  removeFilter: (value: string) => {
    set((state: filterState) => {
      const newFilters = new Set(state.filters);
      newFilters.delete(value);
      return {filters: newFilters}
    });
  },
  removeAllFilters: () => {
    set({filters: new Set()})
  }
}))