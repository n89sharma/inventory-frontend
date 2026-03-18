import { useEffect, useRef } from 'react'
import { subDays } from 'date-fns'
import { ANY_OPTION } from '@/types/select-option-types'
import type { SearchOptions } from '@/types/search-types'

export function useAutoSearch(
  hasSearched: boolean,
  onSearchSetData: (from: Date, to: Date, options: SearchOptions) => Promise<void>,
  defaultDays: number = 60
) {
  const callbackRef = useRef(onSearchSetData)
  callbackRef.current = onSearchSetData

  useEffect(() => {
    if (!hasSearched) {
      callbackRef.current(
        subDays(new Date(), defaultDays),
        new Date(),
        { warehouse: ANY_OPTION, holdBy: ANY_OPTION, holdFor: ANY_OPTION }
      )
    }
  }, [])
}
