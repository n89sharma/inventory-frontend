import { api } from '@/data/api/axios-client'
import type { NewArrival } from '@/lib/arrival-validator'
import { apiErrorHandler } from '@/lib/error-handler'
import type { ApiResponse } from '@/types/api-response-types'
import { getIdOrNullFromSelection, getSelectedOrNull, type SelectOption } from '@/types/select-option-types'
import type { AxiosResponse } from 'axios'
import { z } from 'zod'
import type { Warehouse } from './constants-api'


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
  fromDate: SelectOption<Date>,
  toDate: SelectOption<Date>,
  destination: SelectOption<Warehouse>
): Promise<Arrival[]> {

  const res = await api.get(`/arrivals`, {
    params: {
      fromDate: getSelectedOrNull(fromDate),
      toDate: getSelectedOrNull(toDate),
      warehouse: getIdOrNullFromSelection(destination)
    }
  })
  return z.array(ArrivalSchema).parse(res.data)
}

interface CreateArrivalResponse {
  arrivalNumber: string
}

export async function createArrival(a: NewArrival): Promise<ApiResponse<CreateArrivalResponse>> {
  return api.post(
    '/arrivals',
    {
      vendor: a.vendor,
      transporter: a.transporter,
      warehouse: getSelectedOrNull(a.warehouse),
      comment: a.comment,
      assets: a.assets.map(s => ({
        tempId: s.tempId,
        model: s.model,
        serialNumber: s.serialNumber,
        meterBlack: s.meterBlack,
        meterColour: s.meterColour,
        cassettes: s.cassettes,
        technicalStatus: getSelectedOrNull(s.technicalStatus),
        internalFinisher: s.internalFinisher,
        coreFunctions: s.coreFunctions
      }))
    },
    { headers: { "Content-Type": "application/json" } }
  )
    .then((response: AxiosResponse<CreateArrivalResponse>) => ({
      success: true as const,
      data: response.data
    }))
    .catch(apiErrorHandler<CreateArrivalResponse>)
}