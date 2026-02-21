import type { Transfer } from '@/api/transfer'
import { create } from 'zustand'

interface TransferStore {
  transfers: Transfer[]
  loading: boolean

  setTransfers: (transfers: Transfer[]) => void
  setLoading: (loading: boolean) => void

  clearTransfers: () => void
}

export const useTransferStore = create<TransferStore>((set) => ({
  transfers: [],
  loading: false,

  setTransfers: (transfers) => set({ transfers }),
  setLoading: (loading) => set({ loading }),
  clearTransfers: () => set({ transfers: [] })
}))