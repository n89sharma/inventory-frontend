import { ANY_OPTION, UNSELECTED, type SelectOption } from '@/types/select-option-types'
import { create } from 'zustand'
import type { Invoice } from '../../types/invoice-types'

interface InvoiceStore {
  invoices: Invoice[]
  loading: boolean
  fromDate: SelectOption<Date>
  toDate: SelectOption<Date>
  hasSearched: boolean

  setInvoices: (invoices: Invoice[]) => void
  setLoading: (loading: boolean) => void
  setFromDate: (date: SelectOption<Date>) => void
  setToDate: (date: SelectOption<Date>) => void
  setHasSearched: (hasSearched: boolean) => void

  clearInvoices: () => void
}

export const useInvoiceStore = create<InvoiceStore>((set) => ({
  invoices: [],
  loading: false,
  fromDate: UNSELECTED,
  toDate: ANY_OPTION,
  hasSearched: false,

  setInvoices: (invoices) => set({ invoices }),
  setLoading: (loading) => set({ loading }),
  setFromDate: (fromDate) => set({ fromDate }),
  setToDate: (toDate) => set({ toDate }),
  setHasSearched: (hasSearched) => set({ hasSearched }),
  clearInvoices: () => set({ invoices: [] })
}))
