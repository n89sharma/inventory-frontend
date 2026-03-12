import type { Departure } from '@/data/api/departure-api'
import { create } from 'zustand'

interface DepartureStore {
  departures: Departure[]
  loading: boolean
  fromDate: Date | undefined
  toDate: Date | undefined
  hasSearched: boolean

  setDepartures: (departures: Departure[]) => void
  setLoading: (loading: boolean) => void
  setFromDate: (date: Date | undefined) => void
  setToDate: (date: Date | undefined) => void
  setHasSearched: (hasSearched: boolean) => void

  clearDepartures: () => void
}

export const useDepartureStore = create<DepartureStore>((set) => ({
  departures: [],
  loading: false,
  fromDate: undefined,
  toDate: undefined,
  hasSearched: false,

  setDepartures: (departures) => set({ departures }),
  setLoading: (loading) => set({ loading }),
  setFromDate: (fromDate) => set({ fromDate }),
  setToDate: (toDate) => set({ toDate }),
  setHasSearched: (hasSearched) => set({ hasSearched }),
  clearDepartures: () => set({ departures: [] })
}))