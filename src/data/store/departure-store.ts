import { ANY_OPTION, UNSELECTED, type SelectOption } from '@/types/select-option-types'
import { create } from 'zustand'
import type { Departure } from '../../types/departure-types'
import type { Warehouse } from '../../types/reference-data-types'

interface DepartureStore {
  departures: Departure[]
  fromDate: SelectOption<Date>
  toDate: SelectOption<Date>
  origin: SelectOption<Warehouse>
  loading: boolean
  hasSearched: boolean

  setDepartures: (departures: Departure[]) => void
  setFromDate: (date: SelectOption<Date>) => void
  setToDate: (date: SelectOption<Date>) => void
  setOrigin: (warehouse: SelectOption<Warehouse>) => void
  setLoading: (loading: boolean) => void
  setHasSearched: (hasSearched: boolean) => void

  clearDepartures: () => void
}

export const useDepartureStore = create<DepartureStore>((set) => ({
  departures: [],
  fromDate: UNSELECTED,
  toDate: ANY_OPTION,
  origin: ANY_OPTION,
  loading: false,
  hasSearched: false,

  setDepartures: (departures) => set({ departures }),
  setFromDate: (fromDate) => set({ fromDate }),
  setToDate: (toDate) => set({ toDate }),
  setOrigin: (origin) => set({ origin }),
  setLoading: (loading) => set({ loading }),
  setHasSearched: (hasSearched) => set({ hasSearched }),

  clearDepartures: () => set({ departures: [] })
}))