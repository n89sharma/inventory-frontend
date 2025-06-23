import './App.css'
import { DataRow, DataRowContainer, DetailsContainer, Header, Section } from './components/ui/datacomponents'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { getAssetDetail, type AssetDetails } from "@/services/api"
import { useState } from 'react'

function App() {

  const [inputBarcode, setInputBarcode] = useState("")
  const [aDetails, setAssetDetails] = useState<AssetDetails | null>(null)
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
          <DataRow label="Asset Type" value={aDetails?.asset_type} isFirst={true} />
          <DataRow label="Serial #" value={aDetails?.serial_number} />
          <DataRow label="Meter" value={aDetails?.specs?.meter_total} />
          <DataRow label="Tracking Status" value={aDetails?.tracking_status} />
          <DataRow label="Exit Status" value={aDetails?.exit_status} />
          <DataRow label="Technical Status" value={aDetails?.technical_status} />
          <DataRow label="Location" value={aDetails?.location} />
        </DataRowContainer>
      </Section>

      <Section>
        <Header title="Pricing"></Header>
        <DataRowContainer>
          <DataRow label="Purchase Cost" value={aDetails?.cost.purchase_cost} isFirst={true} curr={true} />
          <DataRow label="Transport Cost" value={aDetails?.cost.transport_cost} curr={true} />
          <DataRow label="Processing Cost" value={aDetails?.cost.processing_cost} curr={true}/>
          <DataRow label="Other Cost" value={aDetails?.cost.other_cost} curr={true}/>
          <DataRow label="Parts Cost" value={aDetails?.cost.parts_cost} curr={true}/>
          <DataRow label="Total Cost" value={aDetails?.cost.total_cost} curr={true}/>
          <DataRow label="Sale Price" value={aDetails?.cost.sale_price} curr={true}/>
        </DataRowContainer>
      </Section>
    </DetailsContainer>
  )
}

export default App
