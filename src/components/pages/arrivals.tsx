import { useArrivalStore } from "@/data/store/arrival-store"
import { getArrivals } from "@/data/api/arrival-api"
import { SearchBar } from "../custom/search-bar"
import { arrivalTableColumns } from "./column-defs/arrival-columns"
import { DataTable } from "@/components/shadcn/data-table"
import { Button } from "../shadcn/button"
import { PlusIcon } from "@phosphor-icons/react"
import { Link } from "react-router-dom"
import { useAutoSearch } from "@/hooks/use-auto-search"
import type { SearchOptions } from "@/types/search-types"

export function ArrivalsPage(): React.JSX.Element {
  const arrivals = useArrivalStore(state => state.arrivals)
  const setArrivals = useArrivalStore(state => state.setArrivals)
  const fromDate = useArrivalStore(state => state.fromDate)
  const setFromDate = useArrivalStore(state => state.setFromDate)
  const toDate = useArrivalStore(state => state.toDate)
  const setToDate = useArrivalStore(state => state.setToDate)
  const warehouse = useArrivalStore(state => state.warehouse)
  const setWarehouse = useArrivalStore(state => state.setWarehouse)
  const hasSearched = useArrivalStore(state => state.hasSearched)
  const setHasSearched = useArrivalStore(state => state.setHasSearched)

  async function onSearchSetData(from: Date, to: Date, { warehouse }: SearchOptions) {
    setFromDate(from)
    setToDate(to)
    setWarehouse(warehouse)
    setHasSearched(true)
    setArrivals(await getArrivals(from, to, warehouse))
  }

  useAutoSearch(hasSearched, onSearchSetData)

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold p-2">
          Arrivals
        </h1>
        <Button asChild>
          <Link to="/arrivals/new"><PlusIcon />Create Arrival</Link>
        </Button>
      </div>

      <SearchBar
        criteria={{ fromDate, toDate, warehouse, setFromDate, setToDate, setWarehouse }}
        onSearchSetData={onSearchSetData}
        showWarehouse={true}
      />
      <DataTable columns={arrivalTableColumns} data={arrivals} />
    </div>
  )
}
