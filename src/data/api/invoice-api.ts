import { api } from '@/data/api/axios-client'
import { getSelectedOrNull, type SelectOption } from '@/types/select-option-types'
import { z } from 'zod'
import { type Invoice, InvoiceSchema } from '../../types/invoice-types'

export async function getInvoices(
  fromDate: SelectOption<Date>,
  toDate: SelectOption<Date>
): Promise<Invoice[]> {

  const res = await api.get(`/invoices`, {
    params: {
      fromDate: getSelectedOrNull(fromDate),
      toDate: getSelectedOrNull(toDate)
    }
  })
  return z.array(InvoiceSchema).parse(res.data)
}