import { Button } from "@/components/shadcn/button"
import { format } from "date-fns"
import { useHoldStore } from "@/data/store/hold-store"
import { getHolds } from "@/data/api/hold-api"
import type { Hold } from "@/data/api/hold-api"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowsDownUpIcon } from "@phosphor-icons/react"
import { CollectionPage } from "./collection"
import { Link } from "react-router-dom"

export const holdTableColumns: ColumnDef<Hold>[] = [
  {
    accessorKey: "hold_number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Hold Number
          <ArrowsDownUpIcon />
        </Button>
      )
    },
    cell: ({ row }) => (
      <Button asChild variant="link" className="h-0">
        <Link to={`/holds/${row.original.hold_number}`}>
          {row.getValue('hold_number')}
        </Link>
      </Button>
    )
  },
  {
    accessorKey: "created_by",
    header: "Created By"
  },
  {
    accessorKey: "created_for",
    header: "Created By"
  },
  {
    accessorKey: "customer",
    header: "Customer"
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
  }
]

export function HoldPage(): React.JSX.Element {
  const holds = useHoldStore((state) => state.holds)
  const setHolds = useHoldStore((state) => state.setHolds)

  async function onSearchSetData(from: Date, to: Date) {
    setHolds(await getHolds(from, to))
  }

  return (
    <CollectionPage
      collection={holds}
      onSearchSetData={onSearchSetData}
      columns={holdTableColumns}
    />
  )
}
