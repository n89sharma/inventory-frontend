import { api } from '@/data/api/axios-client'
import { getIdOrNullFromSelection, getSelectedOrNull, type SelectOption } from '@/types/select-option-types'
import { z } from 'zod'
import { type Departure, DepartureSchema } from '../../types/departure-types'
import type { Warehouse } from '../../types/reference-data-types'

export async function getDepartures(
  fromDate: SelectOption<Date>,
  toDate: SelectOption<Date>,
  origin: SelectOption<Warehouse>
): Promise<Departure[]> {

  const res = await api.get(`/departures`, {
    params: {
      fromDate: getSelectedOrNull(fromDate),
      toDate: getSelectedOrNull(toDate),
      warehouse: getIdOrNullFromSelection(origin),
    }
  })
  return z.array(DepartureSchema).parse(res.data)
}