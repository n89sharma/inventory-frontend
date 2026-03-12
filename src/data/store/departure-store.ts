import type { Departure } from '@/data/api/departure-api'
import { create } from 'zustand'

interface DepartureStore {
  departures: Departure[]
  loading: boolean
  fromDate: Date | undefined
  toDate: Date | undefined

  setDepartures: (departures: Departure[]) => void
  setLoading: (loading: boolean) => void
  setFromDate: (date: Date | undefined) => void
  setToDate: (date: Date | undefined) => void

  clearDepartures: () => void
}

export const useDepartureStore = create<DepartureStore>((set) => ({
  departures: [],
  loading: false,
  fromDate: undefined,
  toDate: undefined,

  setDepartures: (departures) => set({ departures }),
  setLoading: (loading) => set({ loading }),
  setFromDate: (fromDate) => set({ fromDate }),
  setToDate: (toDate) => set({ toDate }),
  clearDepartures: () => set({ departures: [] })
}))