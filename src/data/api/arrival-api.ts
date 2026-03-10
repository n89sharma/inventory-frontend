import { api } from '@/data/api/axios-client'
import type { NewArrival } from '@/lib/arrival-validator'
import { axiosErrorHandler } from '@/lib/utils'
import { z } from 'zod'

const ArrivalSchema = z.object({
  arrival_number: z.string(),
  vendor: z.string(),
  destination_code: z.string(),
  destination_street: z.string(),
  transporter: z.string(),
  created_at: z.iso.datetime(),
  created_by: z.string().nullable()
})

export type Arrival = z.infer<typeof ArrivalSchema>

export async function getArrivals(
  fromDate: Date,
  toDate: Date
): Promise<Arrival[]> {

  const res = await api.get(`/arrivals`, { params: { fromDate, toDate } })
  return z.array(ArrivalSchema).parse(res.data)
}

export async function createArrival(newArrival: NewArrival) {
  return await api.post(
    '/arrivals',
    newArrival,
    { headers: { "Content-Type": "application/json" } }
  ).catch(axiosErrorHandler)
}