import { Button } from "@/components/shadcn/button"
import { format } from "date-fns"
import { useArrivalStore } from "@/store/arrival-store"
import { getArrivals } from "@/api/arrival"
import type { Arrival } from "@/api/arrival"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowsDownUpIcon } from "@phosphor-icons/react"
import { CollectionPage } from "./collection"
import { Link } from "react-router-dom"

export const arrivalTableColumns: ColumnDef<Arrival>[] = [
  {
    accessorKey: "arrival_number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Arrival Number
          <ArrowsDownUpIcon />
        </Button>
      )
    },
    cell: ({ row }) => (
      <Button asChild variant="link" className="h-0">
        <Link to={`/arrivals/${row.original.arrival_number}`}>
          {row.getValue('arrival_number')}
        </Link>
      </Button>
    )
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
    accessorKey: "destination_code",
    header: "Warehouse"
  },
  {
    accessorKey: "transporter",
    header: "Transporter"
  },
  {
    accessorKey: "vendor",
    header: "Vendor"
  }
]

export function ArrivalsPage(): React.JSX.Element {
  const arrivals = useArrivalStore((state) => state.arrivals)
  const setArrivals = useArrivalStore((state) => state.setArrivals)

  async function onSearchSetData(from: Date, to: Date) {
    setArrivals(await getArrivals(from, to))
  }

  return (
    <CollectionPage
      collection={arrivals}
      onSearchSetData={onSearchSetData}
      columns={arrivalTableColumns}
    />
  )
}
