import { useDepartureStore } from "@/data/store/departure-store"
import { getDepartures } from "@/data/api/departure-api"
import { DateSearchBar } from "../custom/date-search-bar"
import { departureTableColumns } from "./column-defs/departure-columns"
import { DataTable } from "@/components/shadcn/data-table"

export function DeparturePage(): React.JSX.Element {
  const departures = useDepartureStore((state) => state.departures)
  const setDepartures = useDepartureStore((state) => state.setDepartures)

  async function onSearchSetData(from: Date, to: Date) {
    setDepartures(await getDepartures(from, to))
  }

  return (
    <div className="flex flex-col gap-2">
      <DateSearchBar onSearchSetData={onSearchSetData} />
      <DataTable columns={departureTableColumns} data={departures} />
    </div>
  )
}
