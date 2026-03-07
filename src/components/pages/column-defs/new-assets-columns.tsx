import type { ColumnDef } from "@tanstack/react-table"
import { formatThousandsK } from "@/lib/formatters"
import type { CoreFunction } from "@/data/api/constants-api"
import { TrashIcon } from "@phosphor-icons/react"
import { Button } from "@/components/shadcn/button"
import { Badge } from "@/components/shadcn/badge"
import type { NewAsset } from "@/lib/arrival-validator"

interface GetNewAssetTableColumnProps {
  onDelete: (id: number) => void
}
export function getNewAssetTableColumns({ onDelete }: GetNewAssetTableColumnProps): ColumnDef<NewAsset>[] {
  return [
    {
      accessorKey: "model.brand_name",
      header: "Brand"
    },
    {
      accessorKey: "model.model_name",
      header: "Model"
    },
    {
      accessorKey: "serialNumber",
      header: "Serial Number"
    },
    {
      accessorKey: "meterBlack",
      cell: ({ row }) => {
        return formatThousandsK(row.original.meterBlack)
      },
      header: "Meter Black"
    },
    {
      accessorKey: "meterColour",
      cell: ({ row }) => {
        return formatThousandsK(row.original.meterColour)
      },
      header: "Meter Colour"
    },
    {
      accessorKey: "internalFinisher",
      header: "Internal Finisher"
    },
    {
      accessorKey: "cassettes",
      header: "Cassettes"
    },
    {
      accessorKey: "technicalStatus.status",
      header: "Technical Status"
    },
    {
      accessorKey: "coreFunctions",
      header: "Core Functions",
      cell: ({ row }) => {
        const functions: CoreFunction[] = row.original.coreFunctions
        return (
          <div className="flex flex-wrap gap-1 max-w-[250px]">
            {functions.map(f => (<Badge key={f.accessory} variant="outline">{f.accessory}</Badge>))}
          </div>
        )
      }
    },
    {
      header: "Remove",
      cell: ({ row }) => (
        <Button
          variant="outline"
          type="button"
          onClick={() => onDelete(row.index)}
        >
          <TrashIcon />
        </Button>
      )
    }
  ]
}