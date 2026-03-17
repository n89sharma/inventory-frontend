import { api } from '@/data/api/axios-client'
import { getIdOrNullFromSelection, type SelectOption } from '@/types/select-option-types'
import { z } from 'zod'
import type { Warehouse } from './constants-api'

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
  toDate: Date,
  warehouse: SelectOption<Warehouse>
): Promise<Departure[]> {

  const res = await api.get(`/departures`, {
    params: {
      fromDate: fromDate,
      toDate: toDate,
      warehouseId: getIdOrNullFromSelection(warehouse)
    }
  })
  return z.array(DepartureSchema).parse(res.data)
}