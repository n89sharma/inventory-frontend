import { DataTable } from "@/components/shadcn/data-table"
import { getDepartures } from "@/data/api/departure-api"
import { useDepartureStore } from "@/data/store/departure-store"
import { useAutoSearch } from "@/hooks/use-auto-search"
import type { SearchOptions } from "@/types/search-option-types"
import { ANY_OPTION } from "@/types/select-option-types"
import { SearchBar } from "../custom/search-bar"
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
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold p-2">
        Departures
      </h1>
      <SearchBar
        searchOptions={{ fromDate, toDate, origin }}
        setSearchOptions={{ setFromDate, setToDate, setOrigin }}
        onSearch={onSearchSetData}
        showOrigin={true}
      />
      <DataTable columns={departureTableColumns} data={departures} />
    </div>
  )
}
