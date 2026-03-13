import { useDepartureStore } from "@/data/store/departure-store"
import { getDepartures } from "@/data/api/departure-api"
import { SearchBar } from "../custom/search-bar"
import { departureTableColumns } from "./column-defs/departure-columns"
import { DataTable } from "@/components/shadcn/data-table"
import { useAutoSearch } from "@/hooks/use-auto-search"
import type { Warehouse } from "@/data/api/constants-api"
import type { SelectOption } from "../custom/select-options"

export function DeparturePage(): React.JSX.Element {
  const departures = useDepartureStore(state => state.departures)
  const setDepartures = useDepartureStore(state => state.setDepartures)
  const fromDate = useDepartureStore(state => state.fromDate)
  const setFromDate = useDepartureStore(state => state.setFromDate)
  const toDate = useDepartureStore(state => state.toDate)
  const setToDate = useDepartureStore(state => state.setToDate)
  const warehouse = useDepartureStore(state => state.warehouse)
  const setWarehouse = useDepartureStore(state => state.setWarehouse)
  const hasSearched = useDepartureStore(state => state.hasSearched)
  const setHasSearched = useDepartureStore(state => state.setHasSearched)

  async function onSearchSetData(from: Date, to: Date, warehouse: SelectOption<Warehouse>) {
    setFromDate(from)
    setToDate(to)
    setWarehouse(warehouse)
    setHasSearched(true)
    setDepartures(await getDepartures(from, to))
  }

  useAutoSearch(hasSearched, onSearchSetData)

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold p-2">
        Departures
      </h1>
      <SearchBar criteria={{ fromDate, toDate, warehouse, setFromDate, setToDate, setWarehouse }} onSearchSetData={onSearchSetData} />
      <DataTable columns={departureTableColumns} data={departures} />
    </div>
  )
}
