import type { Invoice } from '@/data/api/invoice-api'
import { create } from 'zustand'

interface InvoiceStore {
  invoices: Invoice[]
  loading: boolean
  fromDate: Date | undefined
  toDate: Date | undefined

  setInvoices: (invoices: Invoice[]) => void
  setLoading: (loading: boolean) => void
  setFromDate: (date: Date | undefined) => void
  setToDate: (date: Date | undefined) => void

  clearInvoices: () => void
}

export const useInvoiceStore = create<InvoiceStore>((set) => ({
  invoices: [],
  loading: false,
  fromDate: undefined,
  toDate: undefined,

  setInvoices: (invoices) => set({ invoices }),
  setLoading: (loading) => set({ loading }),
  setFromDate: (fromDate) => set({ fromDate }),
  setToDate: (toDate) => set({ toDate }),
  clearInvoices: () => set({ invoices: [] })
}))