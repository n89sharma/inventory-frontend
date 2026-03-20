import { getBreadcrumbForAssetSummary, PageBreadcrumb } from '@/components/custom/page-breadcrumb'
import { getAssetsForArrival, getAssetsForDeparture, getAssetsForHolds, getAssetsForInvoices, getAssetsForTransfers } from "@/data/api/asset-api"
import { useNavigationStore } from "@/data/store/navigation-store"
import type { AssetSummary } from '@/types/asset-types'
import type { NavigationSection } from '@/types/navigation-context'
import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { CollectionEditBar } from '../custom/collection-edit-bar'
import { DataTable } from "../shadcn/data-table"
import { createAssetSummaryColumns } from './column-defs/asset-summary-columns'

export function AssetSummaryPage(): React.JSX.Element {
  const [title, setTitle] = useState('')
  const [assets, setAssets] = useState<AssetSummary[]>([])
  const [loading, setLoading] = useState(true)
  const setLastPath = useNavigationStore(state => state.setLastPath)
  const { section, collectionId } = useParams<{
    section: NavigationSection,
    collectionId: string
  }>();
  const { pathname } = useLocation()

  if (section === undefined || collectionId === undefined)
    throw new Error('Missing parameters')

  const columns = createAssetSummaryColumns(section, collectionId)

  useEffect(() => {
    setLastPath(section, pathname)

    async function loadAssets() {
      if (!collectionId) return

      setLoading(true)
      try {
        if (section === 'arrivals') {
          setTitle(`Arrival ${collectionId}`)
          setAssets(await getAssetsForArrival(collectionId))
        } else if (section === 'transfers') {
          setTitle(`Transfer ${collectionId}`)
          setAssets(await getAssetsForTransfers(collectionId))
        } else if (section === 'departures') {
          setTitle(`Departure ${collectionId}`)
          setAssets(await getAssetsForDeparture(collectionId))
        } else if (section === 'holds') {
          setTitle(`Hold ${collectionId}`)
          setAssets(await getAssetsForHolds(collectionId))
        } else if (section === 'invoices') {
          setTitle(`Invoice ${collectionId}`)
          setAssets(await getAssetsForInvoices(collectionId))
        }
      } finally {
        setLoading(false)
      }
    }

    loadAssets()
  }, [collectionId])

  if (loading) return <div>Loading...</div>
  if (!assets) return <div>No assets!</div>

  return (
    <div className="flex flex-col gap-2">
      <PageBreadcrumb segments={getBreadcrumbForAssetSummary(section, collectionId)} />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold p-2">
          {title}
        </h1>
        <CollectionEditBar section={section} collectionId={collectionId} />
      </div>
      <DataTable columns={columns} data={assets} />
    </div>
  )
}
