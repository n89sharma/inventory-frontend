import { api } from '@/api/axios-client'
import { z } from 'zod'

const ArrivalSchema = z.object({
  arrival_number: z.string(),
  vendor: z.string(),
  destination_code: z.string(),
  destination_street: z.string(),
  transporter: z.string(),
  created_at: z.iso.datetime(),
  created_by: z.string()
})

export type Arrival = z.infer<typeof ArrivalSchema>

export async function getArrivals(
  fromDate: Date,
  toDate: Date
): Promise<Arrival[]> {

  const res = await api.get(`/arrivals`, { params: { fromDate, toDate } })
  return z.array(ArrivalSchema).parse(res.data)
}