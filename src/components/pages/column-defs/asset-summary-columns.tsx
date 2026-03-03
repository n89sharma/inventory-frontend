import { Button } from "@/components/shadcn/button"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowsDownUpIcon } from "@phosphor-icons/react"
import { Link } from "react-router-dom"
import { formatThousandsK } from "@/lib/formatters"
import type { AssetSummary } from "@/data/api/asset-api"

export const assetSummaryTableColumns: ColumnDef<AssetSummary>[] = [
  {
    accessorKey: "barcode",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Barcode
          <ArrowsDownUpIcon />
        </Button>
      )
    },
    cell: ({ row }) => (
      <Link
        to={`/assets/${row.original.barcode}`}
        className="text-primary hover:underline font-medium"
      >
        {row.getValue('barcode')}
      </Link>
    )
  },
  {
    accessorKey: "brand",
    header: "Brand"
  },
  {
    accessorKey: "model",
    header: "Model"
  },
  {
    accessorKey: "serial_number",
    header: "Serial Number"
  },
  {
    accessorKey: "meter_total",
    cell: ({ row }) => {
      return formatThousandsK(row.getValue('meter_total'))
    }
  },
  {
    accessorKey: "technical_status",
    header: "Technical Status"
  }
]