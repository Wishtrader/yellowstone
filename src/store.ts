import {create} from 'zustand';

export interface filterState {
    filters: string[],
    addFilter: (value: string) => void
}

export const useFilters = create(set => ({
  filters: [],
  addFilter: (value: string) => {
    set((state: filterState) => {
      return {filters: [...state.filters, value]}
    });
  }
}))