import { useEffect } from 'react'
import { subDays } from 'date-fns'
import type { Warehouse } from '@/data/api/constants-api'
import { ANY_OPTION, type SelectOption } from '@/components/custom/select-options'

export function useAutoSearch(
  hasSearched: boolean,
  onSearchSetData: (from: Date, to: Date, warehouse: SelectOption<Warehouse>) => Promise<void>,
  defaultDays: number = 60
) {
  useEffect(() => {
    if (!hasSearched) {
      onSearchSetData(subDays(new Date(), defaultDays), new Date(), ANY_OPTION)
    }
  }, [])
}
