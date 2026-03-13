import { api } from '@/data/api/axios-client'
import type { NewArrival } from '@/lib/arrival-validator'
import { apiErrorHandler } from '@/lib/error-handler'
import type { ApiResponse } from '@/types/api-response-types'
import type { SelectOption } from '@/types/select-option-types'
import type { AxiosResponse } from 'axios'
import { z } from 'zod'
import type { Warehouse } from './constants-api'
import { getIdOrNullFromSelection } from '@/lib/utils'

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
  toDate: Date,
  warehouse: SelectOption<Warehouse>
): Promise<Arrival[]> {

  const res = await api.get(`/arrivals`, {
    params: {
      fromDate: fromDate,
      toDate: toDate,
      warehouseId: getIdOrNullFromSelection(warehouse)
    }
  })
  return z.array(ArrivalSchema).parse(res.data)
}

interface CreateArrivalResponse {
  arrivalNumber: string
}

export async function createArrival(newArrival: NewArrival): Promise<ApiResponse<CreateArrivalResponse>> {
  return api.post(
    '/arrivals',
    newArrival,
    { headers: { "Content-Type": "application/json" } }
  )
    .then((response: AxiosResponse<CreateArrivalResponse>) => ({
      success: true as const,
      data: response.data
    }))
    .catch(apiErrorHandler<CreateArrivalResponse>)
}