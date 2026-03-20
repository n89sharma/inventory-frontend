import { api } from '@/data/api/axios-client'
import { getIdOrNullFromSelection, getSelectedOrNull, type SelectOption } from '@/types/select-option-types'
import { z } from 'zod'
import { type Hold, HoldSchema } from '../../types/hold-types'
import type { User } from '../../types/user-types'

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
