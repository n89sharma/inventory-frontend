import { useLocation, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAssetsForArrival, getAssetsForDeparture, getAssetsForHolds, getAssetsForInvoices, getAssetsForTransfers } from "@/data/api/asset-api"
import { useAssetStore } from "@/data/store/asset-store"
import { DataTable } from "../shadcn/data-table"
import { createAssetSummaryColumns } from './column-defs/asset-summary-columns'
import { PageBreadcrumb } from '@/components/custom/page-breadcrumb'

export function AssetSummaryPage(): React.JSX.Element {
  const { id } = useParams()
  const { pathname } = useLocation()
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')

  const assets = useAssetStore((state) => state.assets)
  const setAssets = useAssetStore((state) => state.setAssets)

  const section = pathname.split('/')[1]
  const sectionLabel = section.charAt(0).toUpperCase() + section.slice(1)
  const columns = createAssetSummaryColumns(section, id ?? '')

  useEffect(() => {
    async function loadAssets() {
      if (!id) return

      setLoading(true)
      try {
        if (section === 'arrivals') {
          setTitle(`Arrival ${id}`)
          setAssets(await getAssetsForArrival(id))
        } else if (section === 'transfers') {
          setTitle(`Transfer ${id}`)
          setAssets(await getAssetsForTransfers(id))
        } else if (section === 'departures') {
          setTitle(`Departure ${id}`)
          setAssets(await getAssetsForDeparture(id))
        } else if (section === 'holds') {
          setTitle(`Hold ${id}`)
          setAssets(await getAssetsForHolds(id))
        } else if (section === 'invoices') {
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
      <PageBreadcrumb segments={[
        { label: sectionLabel, href: `/${section}` },
        { label: id ?? '' }
      ]} />
      <h1 className="text-3xl font-bold p-2">
        {title}
      </h1>
      <DataTable columns={columns} data={assets} />
    </div>
  )
}
