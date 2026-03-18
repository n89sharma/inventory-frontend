import { api } from '@/data/api/axios-client'
import { z } from 'zod'
import type { User } from '@/data/api/user-api'
import { getIdOrNullFromSelection, getSelectedOrNull, type SelectOption } from '@/types/select-option-types'

const HoldSchema = z.object({
  hold_number: z.string(),
  created_by: z.string(),
  created_for: z.string(),
  customer: z.string(),
  notes: z.string(),
  created_at: z.iso.datetime(),
  from_dt: z.iso.datetime().nullable(),
  to_dt: z.iso.datetime().nullable()
})

export type Hold = z.infer<typeof HoldSchema>

export async function getHolds(
  fromDate: SelectOption<Date>,
  toDate: SelectOption<Date>,
  holdBy: SelectOption<User>,
  holdFor: SelectOption<User>
): Promise<Hold[]> {
  const res = await api.get(`/holds`, {
    params: {
      fromDate: getSelectedOrNull(fromDate),
      toDate: getSelectedOrNull(toDate),
      holdBy: getIdOrNullFromSelection(holdBy),
      holdFor: getIdOrNullFromSelection(holdFor)
    }
  })
  return z.array(HoldSchema).parse(res.data)
}
