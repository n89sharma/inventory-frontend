import type { Arrival } from '@/data/api/arrival-api'
import { create } from 'zustand'

interface ArrivalStore {
  arrivals: Arrival[]
  loading: boolean
  fromDate: Date | undefined
  toDate: Date | undefined

  setArrivals: (arrivals: Arrival[]) => void
  setLoading: (loading: boolean) => void
  setFromDate: (date: Date | undefined) => void
  setToDate: (date: Date | undefined) => void

  clearArrivals: () => void
}

export const useArrivalStore = create<ArrivalStore>((set) => ({
  arrivals: [],
  loading: false,
  fromDate: undefined,
  toDate: undefined,

  setArrivals: (arrivals) => set({ arrivals }),
  setLoading: (loading) => set({ loading }),
  setFromDate: (fromDate) => set({ fromDate }),
  setToDate: (toDate) => set({ toDate }),
  clearArrivals: () => set({ arrivals: [] })
}))