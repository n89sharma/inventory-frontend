import type { Invoice } from '@/data/api/invoice-api'
import { create } from 'zustand'
import type { Warehouse } from '../api/constants-api'
import { ANY_OPTION, type SelectOption } from '@/types/select-option-types'

interface InvoiceStore {
  invoices: Invoice[]
  loading: boolean
  fromDate: Date | undefined
  toDate: Date | undefined
  warehouse: SelectOption<Warehouse>
  hasSearched: boolean

  setInvoices: (invoices: Invoice[]) => void
  setLoading: (loading: boolean) => void
  setFromDate: (date: Date | undefined) => void
  setToDate: (date: Date | undefined) => void
  setWarehouse: (warehouse: SelectOption<Warehouse>) => void
  setHasSearched: (hasSearched: boolean) => void

  clearInvoices: () => void
}

export const useInvoiceStore = create<InvoiceStore>((set) => ({
  invoices: [],
  loading: false,
  fromDate: undefined,
  toDate: undefined,
  warehouse: ANY_OPTION,
  hasSearched: false,

  setInvoices: (invoices) => set({ invoices }),
  setLoading: (loading) => set({ loading }),
  setFromDate: (fromDate) => set({ fromDate }),
  setToDate: (toDate) => set({ toDate }),
  setWarehouse: (warehouse) => set({ warehouse }),
  setHasSearched: (hasSearched) => set({ hasSearched }),
  clearInvoices: () => set({ invoices: [] })
}))