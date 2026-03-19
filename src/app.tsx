import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from '@/components/layout/layout'
import { AssetDetailsPage } from '@/components/pages/asset-details'
import { ArrivalsPage } from '@/components/pages/arrivals'
import { DeparturePage } from './components/pages/departures'
import { TransferPage } from './components/pages/transfers'
import { HoldPage } from './components/pages/holds'
import { InvoicesPage } from './components/pages/invoices'
import { AssetSummaryPage } from './components/pages/asset-summary'
import { QueryPage } from './components/pages/query'
import { useModelData } from './hooks/use-model-data'
import { useConstantsData } from './hooks/use-constants'
import { ArrivalCreatePage } from './components/pages/arrival-create'
import { useOrgData } from './hooks/use-org-data'
import { useUserData } from './hooks/use-user-data'

function App() {
  useModelData()
  useOrgData()
  useConstantsData()
  useUserData()

  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/arrivals" replace />} />

          <Route path="/arrivals" element={<ArrivalsPage />} />
          <Route path="/arrivals/new" element={<ArrivalCreatePage />} />
          <Route path="/:section/:collectionId" element={<AssetSummaryPage />} />

          <Route path="/transfers" element={<TransferPage />} />
          <Route path="/departures" element={<DeparturePage />} />
          <Route path="/holds" element={<HoldPage />} />
          <Route path="/invoices" element={<InvoicesPage />} />
          <Route path="/reports" element={<ArrivalsPage />} />


          <Route path="/:section/:collectionId/:assetId" element={<AssetDetailsPage />} />

          <Route path="/search" element={<QueryPage />} />
          <Route path="/search/:assetId" element={<AssetDetailsPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
