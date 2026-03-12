import type { Hold } from '@/data/api/hold-api'
import { create } from 'zustand'

interface HoldStore {
  holds: Hold[]
  loading: boolean
  fromDate: Date | undefined
  toDate: Date | undefined
  hasSearched: boolean

  setHolds: (holds: Hold[]) => void
  setLoading: (loading: boolean) => void
  setFromDate: (date: Date | undefined) => void
  setToDate: (date: Date | undefined) => void
  setHasSearched: (hasSearched: boolean) => void

  clearHolds: () => void
}

export const useHoldStore = create<HoldStore>((set) => ({
  holds: [],
  loading: false,
  fromDate: undefined,
  toDate: undefined,
  hasSearched: false,

  setHolds: (holds) => set({ holds }),
  setLoading: (loading) => set({ loading }),
  setFromDate: (fromDate) => set({ fromDate }),
  setToDate: (toDate) => set({ toDate }),
  setHasSearched: (hasSearched) => set({ hasSearched }),
  clearHolds: () => set({ holds: [] })
}))