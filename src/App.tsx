import './App.css'
import { CMYKRow, DataRow, DataRowContainer, DetailsContainer, Header, Section, SectionRow } from './components/ui/datacomponents'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { getAssetDetail, type AssetDetails } from "@/services/api"
import { useState } from 'react'

function App() {

  const [inputBarcode, setInputBarcode] = useState("")
  const [aDetails, setAssetDetails] = useState<AssetDetails | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSearch() {
    if (!inputBarcode.trim()) return
    try {
      setLoading(true)
      const data = await getAssetDetail({ barcode: inputBarcode })
      setAssetDetails(data)
    } catch (err) {
      console.error("Search failed", err)
    } finally {
      setLoading(false)
    }
  }

  return (

    <DetailsContainer>
      <form onSubmit={(e) => {
        e.preventDefault()
        handleSearch()
      }} className="flex flex-row gap-2 justify-center">
        <Input
          className="max-w-60"
          type="text"
          placeholder="Barcode"
          value={inputBarcode}
          onChange={(e) => setInputBarcode(e.target.value)}
        />
        <Button type="submit" variant="default" onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </form>

      <SectionRow>

        <Section>
          <Header title="Summary"></Header>
          <DataRowContainer>
            <DataRow label="Asset Type" value={aDetails?.asset_type} />
            <DataRow label="Serial #" value={aDetails?.serial_number} />
            <DataRow label="Meter" value={aDetails?.specs?.meter_total} />
            <DataRow label="Tracking Status" value={aDetails?.tracking_status} />
            <DataRow label="Availability" value={aDetails?.availability_status} />
            <DataRow label="Technical Status" value={aDetails?.technical_status} />
            <DataRow label="Warehouse" value={aDetails?.warehouse_code} />
            <DataRow label="Location" value={aDetails?.location} />
          </DataRowContainer>
        </Section>

        <Section>
          <Header title="Pricing"></Header>
          <DataRowContainer>
            <DataRow label="Purchase Cost" value={aDetails?.cost.purchase_cost} curr={true} />
            <DataRow label="Transport Cost" value={aDetails?.cost.transport_cost} curr={true} />
            <DataRow label="Processing Cost" value={aDetails?.cost.processing_cost} curr={true} />
            <DataRow label="Other Cost" value={aDetails?.cost.other_cost} curr={true} />
            <DataRow label="Parts Cost" value={aDetails?.cost.parts_cost} curr={true} />
            <DataRow label="Total Cost" value={aDetails?.cost.total_cost} curr={true} />
            <DataRow label="Sale Price" value={aDetails?.cost.sale_price} curr={true} />
          </DataRowContainer>
        </Section>

        <Section>
          <Header title="Specifications"></Header>
          <DataRowContainer>
            <DataRow label="Cassettes" value={aDetails?.specs.cassettes} />
            <DataRow label="Internal Finisher" value={aDetails?.specs.internal_finisher} />
            <CMYKRow label="Drum Life" c_value={aDetails?.specs.drum_life_c} m_value={aDetails?.specs.drum_life_m} y_value={aDetails?.specs.drum_life_y} k_value={aDetails?.specs.drum_life_k} />

          </DataRowContainer>
        </Section>

      </SectionRow>

      <SectionRow>
        <Section>
          <Header title="Hold"></Header>
          <DataRowContainer>
            <DataRow label="Date" value={""}></DataRow>
            <DataRow label="Customer" value={""}></DataRow>
            <DataRow label="For" value={""}></DataRow>
            <DataRow label="By" value={""}></DataRow>
            <DataRow label="Notes" value={""}></DataRow>
            <DataRow label="Hold#" value={""}></DataRow>
          </DataRowContainer>
        </Section>
      </SectionRow>



    </DetailsContainer>
  )
}

export default App
