import { DataTable } from "@/components/shadcn/data-table"
import { getArrivals } from "@/data/api/arrival-api"
import { useArrivalStore } from "@/data/store/arrival-store"
import { useAutoSearch } from "@/hooks/use-auto-search"
import type { SearchOptions } from "@/types/search-option-types"
import { ANY_OPTION } from "@/types/select-option-types"
import { PlusIcon } from "@phosphor-icons/react"
import { Link } from "react-router-dom"
import { SearchBar } from "../../custom/search-bar"
import { Button } from "../../shadcn/button"
import { arrivalTableColumns } from "../column-defs/arrival-columns"

export function ArrivalsSummaryPage(): React.JSX.Element {
  const arrivals = useArrivalStore(state => state.arrivals)
  const setArrivals = useArrivalStore(state => state.setArrivals)
  const fromDate = useArrivalStore(state => state.fromDate)
  const setFromDate = useArrivalStore(state => state.setFromDate)
  const toDate = useArrivalStore(state => state.toDate)
  const setToDate = useArrivalStore(state => state.setToDate)
  const destination = useArrivalStore(state => state.destination)
  const setDestination = useArrivalStore(state => state.setDestination)
  const hasSearched = useArrivalStore(state => state.hasSearched)
  const setHasSearched = useArrivalStore(state => state.setHasSearched)

  async function onSearchSetData({ fromDate, toDate, destination }: SearchOptions) {
    setHasSearched(true)
    setArrivals(await getArrivals(fromDate, toDate, destination ?? ANY_OPTION))
  }

  useAutoSearch(hasSearched, onSearchSetData, { setFromDate, setToDate, setDestination })

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
        searchOptions={{ fromDate, toDate, destination }}
        setSearchOptions={{ setFromDate, setToDate, setDestination }}
        onSearch={onSearchSetData}
        showDestination={true}
      />
      <DataTable columns={arrivalTableColumns} data={arrivals} />
    </div>
  )
}
