import { api } from '@/data/api/axios-client'
import { getIdOrNullFromSelection, getSelectedOrNull, type SelectOption } from '@/types/select-option-types'
import { z } from 'zod'
import type { Warehouse } from '../../types/reference-data-types'
import { type Transfer, TransferSchema } from '../../types/transfer-types'

export async function getTransfers(
  fromDate: SelectOption<Date>,
  toDate: SelectOption<Date>,
  origin: SelectOption<Warehouse>,
  destination: SelectOption<Warehouse>
): Promise<Transfer[]> {

  const res = await api.get(`/transfers`, {
    params: {
      fromDate: getSelectedOrNull(fromDate),
      toDate: getSelectedOrNull(toDate),
      origin: getIdOrNullFromSelection(origin),
      destination: getIdOrNullFromSelection(destination),
    }
  })
  return z.array(TransferSchema).parse(res.data)
}