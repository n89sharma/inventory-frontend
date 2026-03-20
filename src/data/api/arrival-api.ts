import { api } from '@/data/api/axios-client'
import type { NewArrival } from '@/lib/arrival-validator'
import { apiErrorHandler } from '@/lib/error-handler'
import type { ApiResponse } from '@/types/api-response-types'
import { getIdOrNullFromSelection, getSelectedOrNull, type SelectOption } from '@/types/select-option-types'
import type { AxiosResponse } from 'axios'
import { z } from 'zod'
import { type Arrival, ArrivalSchema } from '../../types/arrival-types'
import type { Warehouse } from '../../types/reference-data-types'

interface CreateArrivalResponse {
  arrivalNumber: string
}

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