import type { Departure } from '@/data/api/departure-api'
import { create } from 'zustand'
import type { Warehouse } from '../api/constants-api'
import { ANY_OPTION, type SelectOption } from '@/components/custom/select-options'

interface DepartureStore {
  departures: Departure[]
  loading: boolean
  fromDate: Date | undefined
  toDate: Date | undefined
  warehouse: SelectOption<Warehouse>
  hasSearched: boolean

  setDepartures: (departures: Departure[]) => void
  setLoading: (loading: boolean) => void
  setFromDate: (date: Date | undefined) => void
  setToDate: (date: Date | undefined) => void
  setWarehouse: (warehouse: SelectOption<Warehouse>) => void
  setHasSearched: (hasSearched: boolean) => void

  clearDepartures: () => void
}

export const useDepartureStore = create<DepartureStore>((set) => ({
  departures: [],
  loading: false,
  fromDate: undefined,
  toDate: undefined,
  warehouse: ANY_OPTION,
  hasSearched: false,

  setDepartures: (departures) => set({ departures }),
  setLoading: (loading) => set({ loading }),
  setFromDate: (fromDate) => set({ fromDate }),
  setToDate: (toDate) => set({ toDate }),
  setWarehouse: (warehouse) => set({ warehouse }),
  setHasSearched: (hasSearched) => set({ hasSearched }),
  clearDepartures: () => set({ departures: [] })
}))