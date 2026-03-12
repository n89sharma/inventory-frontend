import type { Arrival } from '@/data/api/arrival-api'
import { create } from 'zustand'

interface ArrivalStore {
  arrivals: Arrival[]
  loading: boolean
  fromDate: Date | undefined
  toDate: Date | undefined
  hasSearched: boolean

  setArrivals: (arrivals: Arrival[]) => void
  setLoading: (loading: boolean) => void
  setFromDate: (date: Date | undefined) => void
  setToDate: (date: Date | undefined) => void
  setHasSearched: (hasSearched: boolean) => void

  clearArrivals: () => void
}

export const useArrivalStore = create<ArrivalStore>((set) => ({
  arrivals: [],
  loading: false,
  fromDate: undefined,
  toDate: undefined,
  hasSearched: false,

  setArrivals: (arrivals) => set({ arrivals }),
  setLoading: (loading) => set({ loading }),
  setFromDate: (fromDate) => set({ fromDate }),
  setToDate: (toDate) => set({ toDate }),
  setHasSearched: (hasSearched) => set({ hasSearched }),
  clearArrivals: () => set({ arrivals: [] })
}))