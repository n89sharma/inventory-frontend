import { api } from '@/api/axios-client'
import { z } from 'zod'

const HoldSchema = z.object({
  hold_number: z.string(),
  created_by: z.string(),
  created_for: z.string(),
  customer: z.string(),
  notes: z.string(),
  created_at: z.iso.datetime(),
  from_dt: z.iso.datetime().nullable(),
  to_dt: z.iso.datetime().nullable()
})

export type Hold = z.infer<typeof HoldSchema>

export async function getHolds(
  fromDate: Date,
  toDate: Date
): Promise<Hold[]> {

  const res = await api.get(`/holds`, { params: { fromDate, toDate } })
  return z.array(HoldSchema).parse(res.data)
}