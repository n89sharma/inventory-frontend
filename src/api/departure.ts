import { api } from '@/api/axios-client'
import { z } from 'zod'

const DepartureSchema = z.object({
  departure_number: z.string(),
  origin_code: z.string(),
  origin_street: z.string(),
  destination: z.string(),
  transporter: z.string(),
  created_at: z.iso.datetime(),
  created_by: z.string()
})

export type Departure = z.infer<typeof DepartureSchema>

export async function getDepartures(
  fromDate: Date,
  toDate: Date
): Promise<Departure[]> {

  const res = await api.get(`/departures`, { params: { fromDate, toDate } })
  return z.array(DepartureSchema).parse(res.data)
}