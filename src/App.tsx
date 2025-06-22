import './App.css'
import { DataRow, DataRowContainer, DetailsContainer, Header, Section } from './components/ui/datacomponents'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { getAssetDetail, type AssetDetailResponse } from "@/services/api"
import { useState } from 'react'

function App() {

  const [inputBarcode, setInputBarcode] = useState("")
  const [assetDetails, setAssetDetails] = useState<AssetDetailResponse | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSearch() {
    if(!inputBarcode.trim()) return
    try {
      setLoading(true)
      const data = await getAssetDetail({barcode: inputBarcode})
      setAssetDetails(data)
    } catch (err) {
      console.error("Search failed", err)
    } finally {
      setLoading(false)
    }
  }

  return (

    <DetailsContainer>
      <div className="flex w-full max-w-sm items-center gap-2">
        <Input type="text" placeholder="Barcode" value={inputBarcode} onChange={(e) => setInputBarcode(e.target.value)}/>
        <Button type="submit" variant="default" onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </div>
      <Section>
        <Header title="Summary"></Header>
        <DataRowContainer>
          <DataRow label="Asset Type" value={assetDetails?.asset_type ?? "-"} isFirst={true} />
          <DataRow label="Serial #" value={assetDetails?.serial_number ?? "-"} />
          <DataRow label="Meter" value={assetDetails?.technical_specification?.meter_total ?? "-"} />
          <DataRow label="Tracking Status" value={assetDetails?.tracking_status ?? "-"} />
          <DataRow label="Exit Status" value={assetDetails?.exit_status ?? "-"} />
          <DataRow label="Technical Status" value={assetDetails?.technical_status ?? "-"} />
          <DataRow label="Location" value={assetDetails?.asset_location ?? "-"} />
        </DataRowContainer>
      </Section>
    </DetailsContainer>
  )
}

export default App
