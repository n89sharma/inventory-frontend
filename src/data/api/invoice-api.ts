import { api } from '@/data/api/axios-client'
import { getSelectedOrNull, type SelectOption } from '@/types/select-option-types'
import { z } from 'zod'

const InvoiceSchema = z.object({
  invoice_number: z.string(),
  organization: z.string(),
  created_by: z.string(),
  created_at: z.iso.datetime(),
  is_cleared: z.boolean(),
  invoice_type: z.string()
})

export type Invoice = z.infer<typeof InvoiceSchema>

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