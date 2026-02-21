import { api } from '@/api/axios-client'
import { z } from 'zod'

const TransferSchema = z.object({
  transfer_number: z.string(),
  origin_code: z.string(),
  origin_street: z.string(),
  destination_code: z.string(),
  destination_street: z.string(),
  transporter: z.string(),
  created_at: z.iso.datetime(),
  created_by: z.string()
})

export type Transfer = z.infer<typeof TransferSchema>

export async function getTransfers(
  fromDate: Date,
  toDate: Date
): Promise<Transfer[]> {

  const res = await api.get(`/transfers`, { params: { fromDate, toDate } })
  return z.array(TransferSchema).parse(res.data)
}