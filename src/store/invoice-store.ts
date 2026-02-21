import type { Invoice } from '@/api/invoice'
import { create } from 'zustand'

interface InvoiceStore {
  invoices: Invoice[]
  loading: boolean

  setInvoices: (invoices: Invoice[]) => void
  setLoading: (loading: boolean) => void

  clearInvoices: () => void
}

export const useInvoiceStore = create<InvoiceStore>((set) => ({
  invoices: [],
  loading: false,

  setInvoices: (invoices) => set({ invoices }),
  setLoading: (loading) => set({ loading }),
  clearInvoices: () => set({ invoices: [] })
}))