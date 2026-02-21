import type { Departure } from '@/api/departure'
import { create } from 'zustand'

interface DepartureStore {
  departures: Departure[]
  loading: boolean

  setDepartures: (departures: Departure[]) => void
  setLoading: (loading: boolean) => void

  clearDepartures: () => void
}

export const useDepartureStore = create<DepartureStore>((set) => ({
  departures: [],
  loading: false,

  setDepartures: (departures) => set({ departures }),
  setLoading: (loading) => set({ loading }),
  clearDepartures: () => set({ departures: [] })
}))