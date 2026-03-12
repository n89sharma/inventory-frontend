import { useDepartureStore } from "@/data/store/departure-store"
import { getDepartures } from "@/data/api/departure-api"
import { DateSearchBar } from "../custom/date-search-bar"
import { departureTableColumns } from "./column-defs/departure-columns"
import { DataTable } from "@/components/shadcn/data-table"
import { useAutoSearch } from "@/hooks/use-auto-search"

export function DeparturePage(): React.JSX.Element {
  const departures = useDepartureStore(state => state.departures)
  const setDepartures = useDepartureStore(state => state.setDepartures)
  const fromDate = useDepartureStore(state => state.fromDate)
  const toDate = useDepartureStore(state => state.toDate)
  const setFromDate = useDepartureStore(state => state.setFromDate)
  const setToDate = useDepartureStore(state => state.setToDate)
  const hasSearched = useDepartureStore(state => state.hasSearched)
  const setHasSearched = useDepartureStore(state => state.setHasSearched)

  async function onSearchSetData(from: Date, to: Date) {
    setFromDate(from)
    setToDate(to)
    setHasSearched(true)
    setDepartures(await getDepartures(from, to))
  }

  useAutoSearch(hasSearched, onSearchSetData)

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold p-2">
        Departures
      </h1>
      <DateSearchBar onSearchSetData={onSearchSetData} initialFromDate={fromDate} initialToDate={toDate} />
      <DataTable columns={departureTableColumns} data={departures} />
    </div>
  )
}
