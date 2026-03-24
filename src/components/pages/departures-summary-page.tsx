import { getDepartures } from "@/data/api/departure-api"
import { useDepartureStore } from "@/data/store/departure-store"
import { useAutoSearch } from "@/hooks/use-auto-search"
import type { SearchOptions } from "@/types/search-option-types"
import { ANY_OPTION } from "@/types/select-option-types"
import { SearchBar } from "../custom/search-bar"
import { CollectionPage } from "./collection-page"
import { departureTableColumns } from "./column-defs/departure-columns"

export function DepartureSummaryPage(): React.JSX.Element {
  const departures = useDepartureStore(state => state.departures)
  const setDepartures = useDepartureStore(state => state.setDepartures)
  const fromDate = useDepartureStore(state => state.fromDate)
  const setFromDate = useDepartureStore(state => state.setFromDate)
  const toDate = useDepartureStore(state => state.toDate)
  const setToDate = useDepartureStore(state => state.setToDate)
  const origin = useDepartureStore(state => state.origin)
  const setOrigin = useDepartureStore(state => state.setOrigin)
  const hasSearched = useDepartureStore(state => state.hasSearched)
  const setHasSearched = useDepartureStore(state => state.setHasSearched)

  async function onSearchSetData({ fromDate, toDate, origin }: SearchOptions) {
    setHasSearched(true)
    setDepartures(await getDepartures(fromDate, toDate, origin ?? ANY_OPTION))
  }

  useAutoSearch(hasSearched, onSearchSetData, { setFromDate, setToDate, setOrigin })

  return (
    <CollectionPage
      title="Departures"
      columns={departureTableColumns}
      data={departures}
      searchBar={
        <SearchBar
          searchOptions={{ fromDate, toDate, origin }}
          setSearchOptions={{ setFromDate, setToDate, setOrigin }}
          onSearch={onSearchSetData}
          showOrigin={true}
        />
      }
    />
  )
}
