import { useArrivalStore } from "@/data/store/arrival-store"
import { getArrivals } from "@/data/api/arrival-api"
import { DateSearchBar } from "../custom/date-search-bar"
import { arrivalTableColumns } from "./column-defs/arrival-columns"
import { DataTable } from "@/components/shadcn/data-table"
import { Button } from "../shadcn/button"
import { PlusIcon } from "@phosphor-icons/react"
import { Link } from "react-router-dom"

export function ArrivalsPage(): React.JSX.Element {
  const arrivals = useArrivalStore((state) => state.arrivals)
  const setArrivals = useArrivalStore((state) => state.setArrivals)

  async function onSearchSetData(from: Date, to: Date) {
    setArrivals(await getArrivals(from, to))
  }

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

      <DateSearchBar onSearchSetData={onSearchSetData} />
      <DataTable columns={arrivalTableColumns} data={arrivals} />
    </div>
  )
}
