import type { Transfer } from '@/data/api/transfer-api'
import { create } from 'zustand'
import type { Warehouse } from '../api/constants-api'
import { ANY_OPTION, type SelectOption } from '@/components/custom/select-options'

interface TransferStore {
  transfers: Transfer[]
  loading: boolean
  fromDate: Date | undefined
  toDate: Date | undefined
  warehouse: SelectOption<Warehouse>
  hasSearched: boolean

  setTransfers: (transfers: Transfer[]) => void
  setLoading: (loading: boolean) => void
  setFromDate: (date: Date | undefined) => void
  setToDate: (date: Date | undefined) => void
  setWarehouse: (warehouse: SelectOption<Warehouse>) => void
  setHasSearched: (hasSearched: boolean) => void

  clearTransfers: () => void
}

export const useTransferStore = create<TransferStore>((set) => ({
  transfers: [],
  loading: false,
  fromDate: undefined,
  toDate: undefined,
  warehouse: ANY_OPTION,
  hasSearched: false,

  setTransfers: (transfers) => set({ transfers }),
  setLoading: (loading) => set({ loading }),
  setFromDate: (fromDate) => set({ fromDate }),
  setToDate: (toDate) => set({ toDate }),
  setWarehouse: (warehouse) => set({ warehouse }),
  setHasSearched: (hasSearched) => set({ hasSearched }),
  clearTransfers: () => set({ transfers: [] })
}))