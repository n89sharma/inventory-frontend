import { useLocation, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAssetsForArrival, getAssetsForDeparture, getAssetsForHolds, getAssetsForInvoices, getAssetsForTransfers } from "@/data/api/asset-api"
import { useAssetStore } from "@/data/store/asset-store"
import { DataTable } from "../shadcn/data-table"
import { assetSummaryTableColumns } from './column-defs/asset-summary-columns'

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
      <DataTable columns={assetSummaryTableColumns} data={assets} />
    </div>
  )
}
