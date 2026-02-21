import type { Hold } from '@/api/hold'
import { create } from 'zustand'

interface HoldStore {
  holds: Hold[]
  loading: boolean

  setHolds: (holds: Hold[]) => void
  setLoading: (loading: boolean) => void

  clearHolds: () => void
}

export const useHoldStore = create<HoldStore>((set) => ({
  holds: [],
  loading: false,

  setHolds: (holds) => set({ holds }),
  setLoading: (loading) => set({ loading }),
  clearHolds: () => set({ holds: [] })
}))