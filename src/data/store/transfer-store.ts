import type { Transfer } from '@/data/api/transfer-api'
import { create } from 'zustand'

interface TransferStore {
  transfers: Transfer[]
  loading: boolean
  fromDate: Date | undefined
  toDate: Date | undefined
  hasSearched: boolean

  setTransfers: (transfers: Transfer[]) => void
  setLoading: (loading: boolean) => void
  setFromDate: (date: Date | undefined) => void
  setToDate: (date: Date | undefined) => void
  setHasSearched: (hasSearched: boolean) => void

  clearTransfers: () => void
}

export const useTransferStore = create<TransferStore>((set) => ({
  transfers: [],
  loading: false,
  fromDate: undefined,
  toDate: undefined,
  hasSearched: false,

  setTransfers: (transfers) => set({ transfers }),
  setLoading: (loading) => set({ loading }),
  setFromDate: (fromDate) => set({ fromDate }),
  setToDate: (toDate) => set({ toDate }),
  setHasSearched: (hasSearched) => set({ hasSearched }),
  clearTransfers: () => set({ transfers: [] })
}))