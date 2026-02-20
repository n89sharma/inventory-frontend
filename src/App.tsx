import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from './components/layout/layout'
import { AssetDetailsPage } from './components/pages/asset-details'
import { ArrivalsPage } from './components/pages/arrivals'

function App() {

  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/arrivals" replace />} />
          <Route path="/arrivals" element={<ArrivalsPage />} />
          <Route path="/transfers" element={<ArrivalsPage />} />
          <Route path="/departures" element={<ArrivalsPage />} />
          <Route path="/holds" element={<ArrivalsPage />} />
          <Route path="/invoices" element={<ArrivalsPage />} />
          <Route path="/query" element={<ArrivalsPage />} />
          <Route path="/reports" element={<ArrivalsPage />} />
          <Route path="/assets" element={<AssetDetailsPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  )
}

export default App
