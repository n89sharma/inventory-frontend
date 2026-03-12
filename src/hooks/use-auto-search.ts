import { useEffect } from 'react'
import { subDays } from 'date-fns'

export function useAutoSearch(
  hasSearched: boolean,
  onSearchSetData: (from: Date, to: Date) => Promise<void>,
  defaultDays: number = 7
) {
  useEffect(() => {
    if (!hasSearched) {
      onSearchSetData(subDays(new Date(), defaultDays), new Date())
    }
  }, [])
}
