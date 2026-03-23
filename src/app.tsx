import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from '@/components/layout/layout'
import { AssetDetailsPage } from '@/components/pages/asset-details'
import { ArrivalsPage } from '@/components/pages/arrivals'
import { DeparturePage } from './components/pages/departures'
import { TransferPage } from './components/pages/transfers'
import { HoldPage } from './components/pages/holds'
import { InvoicesPage } from './components/pages/invoices'
import { ArrivalSummaryPage } from './components/pages/arrival-summary'
import { TransferSummaryPage } from './components/pages/transfer-summary'
import { DepartureSummaryPage } from './components/pages/departure-summary'
import { HoldSummaryPage } from './components/pages/hold-summary'
import { InvoiceSummaryPage } from './components/pages/invoice-summary'
import { QueryPage } from './components/pages/query'
import { useModelData } from './hooks/use-model-data'
import { useConstantsData } from './hooks/use-constants'
import { ArrivalCreatePage } from './components/pages/arrival-create'
import { useOrgData } from './hooks/use-org-data'
import { useUserData } from './hooks/use-user-data'
import { ArrivalEditPage } from './components/pages/arrival-edit'

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
          <Route path="/arrivals/:collectionId/edit" element={<ArrivalEditPage />} />
          <Route path="/arrivals/:collectionId" element={<ArrivalSummaryPage />} />

          <Route path="/transfers" element={<TransferPage />} />
          <Route path="/transfers/:collectionId" element={<TransferSummaryPage />} />

          <Route path="/departures" element={<DeparturePage />} />
          <Route path="/departures/:collectionId" element={<DepartureSummaryPage />} />

          <Route path="/holds" element={<HoldPage />} />
          <Route path="/holds/:collectionId" element={<HoldSummaryPage />} />

          <Route path="/invoices" element={<InvoicesPage />} />
          <Route path="/invoices/:collectionId" element={<InvoiceSummaryPage />} />

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
