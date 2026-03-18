import type { Warehouse } from '@/data/api/constants-api'
import type { User } from '@/data/api/user-api'
import type { SelectOption } from './select-option-types'

export type SearchOptions = {
  warehouse: SelectOption<Warehouse>
  holdBy: SelectOption<User>
  holdFor: SelectOption<User>
}
