import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from '@/components/layout/layout'
import { AssetDetailsPage } from '@/components/pages/asset-details'
import { ArrivalsPage } from '@/components/pages/arrivals'
import { DeparturePage } from './components/pages/departures'
import { TransferPage } from './components/pages/transfers'
import { HoldPage } from './components/pages/holds'
import { InvoicesPage } from './components/pages/invoices'

function App() {

  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/arrivals" replace />} />
          <Route path="/arrivals" element={<ArrivalsPage />} />
          <Route path="/transfers" element={<TransferPage />} />
          <Route path="/departures" element={<DeparturePage />} />
          <Route path="/holds" element={<HoldPage />} />
          <Route path="/invoices" element={<InvoicesPage />} />
          <Route path="/query" element={<ArrivalsPage />} />
          <Route path="/reports" element={<ArrivalsPage />} />
          <Route path="/assets" element={<AssetDetailsPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
