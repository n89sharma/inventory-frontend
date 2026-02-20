import type { Arrival } from '@/api/arrival'
import { create } from 'zustand'

interface ArrivalStore {
  arrivals: Arrival[]
  loading: boolean

  setArrivals: (arrivals: Arrival[]) => void
  setLoading: (loading: boolean) => void

  clearArrivals: () => void
}

export const useArrivalStore = create<ArrivalStore>((set) => ({
  arrivals: [],
  loading: false,

  setArrivals: (arrivals) => set({ arrivals }),
  setLoading: (loading) => set({ loading }),
  clearArrivals: () => set({ arrivals: [] })
}))