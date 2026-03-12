import type { Transfer } from '@/data/api/transfer-api'
import { create } from 'zustand'

interface TransferStore {
  transfers: Transfer[]
  loading: boolean
  fromDate: Date | undefined
  toDate: Date | undefined

  setTransfers: (transfers: Transfer[]) => void
  setLoading: (loading: boolean) => void
  setFromDate: (date: Date | undefined) => void
  setToDate: (date: Date | undefined) => void

  clearTransfers: () => void
}

export const useTransferStore = create<TransferStore>((set) => ({
  transfers: [],
  loading: false,
  fromDate: undefined,
  toDate: undefined,

  setTransfers: (transfers) => set({ transfers }),
  setLoading: (loading) => set({ loading }),
  setFromDate: (fromDate) => set({ fromDate }),
  setToDate: (toDate) => set({ toDate }),
  clearTransfers: () => set({ transfers: [] })
}))