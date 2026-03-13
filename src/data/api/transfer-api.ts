import { api } from '@/data/api/axios-client'
import type { SelectOption } from '@/types/select-option-types'
import { z } from 'zod'
import type { Warehouse } from './constants-api'
import { getIdOrNullFromSelection } from '@/lib/utils'

const TransferSchema = z.object({
  transfer_number: z.string(),
  origin_code: z.string(),
  origin_street: z.string(),
  destination_code: z.string(),
  destination_street: z.string(),
  transporter: z.string(),
  created_at: z.iso.datetime(),
  created_by: z.string()
})

export type Transfer = z.infer<typeof TransferSchema>

export async function getTransfers(
  fromDate: Date,
  toDate: Date,
  warehouse: SelectOption<Warehouse>
): Promise<Transfer[]> {

  const res = await api.get(`/transfers`, {
    params: {
      fromDate: fromDate,
      toDate: toDate,
      warehouseId: getIdOrNullFromSelection(warehouse)
    }
  })
  return z.array(TransferSchema).parse(res.data)
}