import { Button } from "@/components/shadcn/button"
import { format } from "date-fns"
import { useDepartureStore } from "@/store/departure-store"
import { getDepartures } from "@/api/departure"
import type { Departure } from "@/api/departure"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowsDownUpIcon } from "@phosphor-icons/react"
import { CollectionPage } from "./collection"

export const departureTableColumns: ColumnDef<Departure>[] = [
  {
    accessorKey: "departure_number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Departure Number
          <ArrowsDownUpIcon />
        </Button>
      )
    },
  },
  {
    accessorKey: "created_at",
    cell: ({ getValue }) => {
      const date = getValue<Date>()
      return date ? format(date, "PPP") : "-"
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowsDownUpIcon />
        </Button>
      )
    },
  },
  {
    accessorKey: "created_by",
    header: "Created By"
  },
  {
    accessorKey: "origin_code",
    header: "Warehouse"
  },
  {
    accessorKey: "transporter",
    header: "Transporter"
  },
  {
    accessorKey: "destination",
    header: "Customer"
  }
]

export function DeparturePage(): React.JSX.Element {
  const departures = useDepartureStore((state) => state.departures)
  const setDepartures = useDepartureStore((state) => state.setDepartures)

  async function onSearchSetData(from: Date, to: Date) {
    setDepartures(await getDepartures(from, to))
  }

  return (
    <CollectionPage
      collection={departures}
      onSearchSetData={onSearchSetData}
      columns={departureTableColumns}
    />
  )
}
