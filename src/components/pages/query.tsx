import { useState } from 'react'
import { Button } from "@/components/shadcn/button"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowsDownUpIcon } from "@phosphor-icons/react"
import { Link } from "react-router-dom"
import { getAssetsForQuery, type AssetSummary } from "@/data/api/asset-api"
import { useAssetStore } from "@/data/store/asset-store"
import { formatThousandsK } from "@/lib/formatters"
import { DataTable } from "../shadcn/data-table"
import { ModelDropdownSelect } from '../custom/model-dropdown-select'

export const assetSummaryTable: ColumnDef<AssetSummary>[] = [
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

export function QueryPage(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState({
    brand: null,
    model: null,
    assetType: null,
    trackingStatus: null,
    location: null,
    meter: null
  })
  const [loading, setLoading] = useState(false)
  const assets = useAssetStore((state) => state.assets)
  const setAssets = useAssetStore((state) => state.setAssets)


  function handleSearchQueryUpdate(field: string, value: string) {
    setSearchQuery(prev => ({
      ...prev,
      [field]: value
    }))
  }

  async function submitQuery() {
    setLoading(true)
    try {
      if (!!searchQuery.brand || !!searchQuery.model || !!searchQuery.assetType || !!searchQuery.trackingStatus || !!searchQuery.location || !!searchQuery.meter) {
        setAssets(await getAssetsForQuery(searchQuery))
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading...</div>
  if (!assets) return <div>No assets!</div>

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2 border rounded-md p-2">

        <ModelDropdownSelect onSelection={handleSearchQueryUpdate} />
        <Button
          className="rounded-md"
          onClick={submitQuery}
        >Search</Button>

        <div className="border">
          {Object.values(searchQuery).map((e) => <p>{e}</p>)}
        </div>
      </div>
      <DataTable columns={assetSummaryTable} data={assets} />
    </div>
  )
}
