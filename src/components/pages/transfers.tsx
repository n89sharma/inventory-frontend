import { Button } from "@/components/shadcn/button"
import { format } from "date-fns"
import { useTransferStore } from "@/store/transfer-store"
import { getTransfers } from "@/api/transfer"
import type { Transfer } from "@/api/transfer"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowsDownUpIcon } from "@phosphor-icons/react"
import { CollectionPage } from "./collection"

export const transferTableColumns: ColumnDef<Transfer>[] = [
  {
    accessorKey: "transfer_number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Transfer Number
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
    accessorKey: "origin_code",
    header: "Origin"
  },
  {
    accessorKey: "destination_code",
    header: "Destination"
  },
  {
    accessorKey: "transporter",
    header: "Transporter"
  },
  {
    accessorKey: "created_by",
    header: "Created By"
  }
]

export function TransferPage(): React.JSX.Element {
  const departures = useTransferStore((state) => state.transfers)
  const setTransfers = useTransferStore((state) => state.setTransfers)

  async function onSearchSetData(from: Date, to: Date) {
    setTransfers(await getTransfers(from, to))
  }

  return (
    <CollectionPage
      collection={departures}
      onSearchSetData={onSearchSetData}
      columns={transferTableColumns}
    />
  )
}
