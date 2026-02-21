import { api } from '@/api/axios-client'
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
  fromDate: Date,
  toDate: Date
): Promise<Invoice[]> {

  const res = await api.get(`/invoices`, { params: { fromDate, toDate } })
  return z.array(InvoiceSchema).parse(res.data)
}