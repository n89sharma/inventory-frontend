import type { Arrival } from '@/data/api/arrival-api'
import { create } from 'zustand'
import type { Warehouse } from '../api/constants-api'
import { ANY_OPTION, type SelectOption } from '@/components/custom/select-options'

interface ArrivalStore {
  arrivals: Arrival[]
  loading: boolean
  fromDate: Date | undefined
  toDate: Date | undefined
  warehouse: SelectOption<Warehouse>
  hasSearched: boolean

  setArrivals: (arrivals: Arrival[]) => void
  setLoading: (loading: boolean) => void
  setFromDate: (date: Date | undefined) => void
  setToDate: (date: Date | undefined) => void
  setWarehouse: (warehouse: SelectOption<Warehouse>) => void
  setHasSearched: (hasSearched: boolean) => void

  clearArrivals: () => void
}

export const useArrivalStore = create<ArrivalStore>((set) => ({
  arrivals: [],
  loading: false,
  fromDate: undefined,
  toDate: undefined,
  warehouse: ANY_OPTION,
  hasSearched: false,

  setArrivals: (arrivals) => set({ arrivals }),
  setLoading: (loading) => set({ loading }),
  setFromDate: (fromDate) => set({ fromDate }),
  setToDate: (toDate) => set({ toDate }),
  setWarehouse: (warehouse) => set({ warehouse }),
  setHasSearched: (hasSearched) => set({ hasSearched }),
  clearArrivals: () => set({ arrivals: [] })
}))