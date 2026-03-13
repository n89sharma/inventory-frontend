import type { Hold } from '@/data/api/hold-api'
import { create } from 'zustand'
import type { Warehouse } from '../api/constants-api'
import { ANY_OPTION, type SelectOption } from '@/components/custom/select-options'

interface HoldStore {
  holds: Hold[]
  loading: boolean
  fromDate: Date | undefined
  toDate: Date | undefined
  warehouse: SelectOption<Warehouse>
  hasSearched: boolean

  setHolds: (holds: Hold[]) => void
  setLoading: (loading: boolean) => void
  setFromDate: (date: Date | undefined) => void
  setToDate: (date: Date | undefined) => void
  setWarehouse: (warehouse: SelectOption<Warehouse>) => void
  setHasSearched: (hasSearched: boolean) => void

  clearHolds: () => void
}

export const useHoldStore = create<HoldStore>((set) => ({
  holds: [],
  loading: false,
  fromDate: undefined,
  toDate: undefined,
  warehouse: ANY_OPTION,
  hasSearched: false,

  setHolds: (holds) => set({ holds }),
  setLoading: (loading) => set({ loading }),
  setFromDate: (fromDate) => set({ fromDate }),
  setToDate: (toDate) => set({ toDate }),
  setWarehouse: (warehouse) => set({ warehouse }),
  setHasSearched: (hasSearched) => set({ hasSearched }),
  clearHolds: () => set({ holds: [] })
}))