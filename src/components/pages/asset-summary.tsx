import { useLocation, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button } from "@/components/shadcn/button"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowsDownUpIcon } from "@phosphor-icons/react"
import { Link } from "react-router-dom"
import { getAssetsForArrival, getAssetsForDeparture, getAssetsForHolds, getAssetsForInvoices, getAssetsForTransfers, type AssetSummary } from "@/api/asset"
import { useAssetStore } from "@/store/asset-store"
import { formatThousandsK } from "@/lib/formatters"
import { DataTable } from "../shadcn/data-table"
import { SectionRow, Section, AssetTitle } from '../custom/asset-detail'

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

export function AssetSummaryPage(): React.JSX.Element {
  const { id } = useParams()
  const { pathname } = useLocation()
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')

  const assets = useAssetStore((state) => state.assets)
  const setAssets = useAssetStore((state) => state.setAssets)

  const isArrival = pathname.startsWith('/arrivals')
  const isTransfer = pathname.startsWith('/transfers')
  const isDeparture = pathname.startsWith('/departures')
  const isHolds = pathname.startsWith('/holds')
  const isInvoice = pathname.startsWith('/invoices')

  useEffect(() => {
    async function loadAssets() {
      if (!id) return

      setLoading(true)
      try {
        if (isArrival) {
          setTitle(`Arrival ${id}`)
          setAssets(await getAssetsForArrival(id))
        } else if (isTransfer) {
          setTitle(`Transfer ${id}`)
          setAssets(await getAssetsForTransfers(id))
        } else if (isDeparture) {
          setTitle(`Departure ${id}`)
          setAssets(await getAssetsForDeparture(id))
        } else if (isHolds) {
          setTitle(`Hold ${id}`)
          setAssets(await getAssetsForHolds(id))
        } else if (isInvoice) {
          setTitle(`Invoice ${id}`)
          setAssets(await getAssetsForInvoices(id))
        }
      } finally {
        setLoading(false)
      }
    }

    loadAssets()
  }, [id])

  if (loading) return <div>Loading...</div>
  if (!assets) return <div>No assets!</div>

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold p-2">
        {title}
      </h1>
      <DataTable columns={assetSummaryTable} data={assets} />
    </div>
  )
}
