import { MainLayout } from '@/components/layout/layout'
import { ArrivalsSummaryPage } from '@/components/pages/arrival/arrivals-summary-page'
import { AssetDetailsPage } from '@/components/pages/asset-details-page'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ArrivalCreatePage } from './components/pages/arrival/arrival-create-page'
import { ArrivalDetailsPage } from './components/pages/arrival/arrival-details-page'
import { ArrivalEditPage } from './components/pages/arrival/arrival-edit-page'
import { DepartureDetailsPage } from './components/pages/departure-details-page'
import { HoldDetailsPage } from './components/pages/hold-details-page'
import { HoldSummaryPage } from './components/pages/holds-summary-page'
import { InvoiceDetailsPage } from './components/pages/invoice-details-page'
import { InvoicesSummaryPage } from './components/pages/invoices-summary-page'
import { QueryPage } from './components/pages/query'
import { TransferDetailsPage } from './components/pages/transfer-details-page'
import { TransferSummaryPage } from './components/pages/transfers-summary-page'
import { useConstantsData } from './hooks/use-constants'
import { useModelData } from './hooks/use-model-data'
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

          <Route path="/arrivals" element={<ArrivalsSummaryPage />} />
          <Route path="/arrivals/new" element={<ArrivalCreatePage />} />
          <Route path="/arrivals/:collectionId/edit" element={<ArrivalEditPage />} />
          <Route path="/arrivals/:collectionId" element={<ArrivalDetailsPage />} />

          <Route path="/transfers" element={<TransferSummaryPage />} />
          <Route path="/transfers/:collectionId" element={<TransferDetailsPage />} />

          <Route path="/departures" element={<DepartureDetailsPage />} />
          <Route path="/departures/:collectionId" element={<DepartureDetailsPage />} />

          <Route path="/holds" element={<HoldSummaryPage />} />
          <Route path="/holds/:collectionId" element={<HoldDetailsPage />} />

          <Route path="/invoices" element={<InvoicesSummaryPage />} />
          <Route path="/invoices/:collectionId" element={<InvoiceDetailsPage />} />

          <Route path="/reports" element={<ArrivalsSummaryPage />} />

          <Route path="/:section/:collectionId/:assetId" element={<AssetDetailsPage />} />

          <Route path="/search" element={<QueryPage />} />
          <Route path="/search/:assetId" element={<AssetDetailsPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
