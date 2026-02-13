import { CMYKRow, DataRow, DataRowContainer, DetailsContainer, Header, Section, SectionRow, Title } from '../ui/datacomponents'
import { useSearchStore } from "@/store/useSearchStore"

export function AssetDetailsPage() {

  const ad = useSearchStore((state) => state.assetDetails)

  return (

    <DetailsContainer>


      <SectionRow className="flex-col">
        <Section>
          <Title brand={ad?.brand} model={ad?.model} barcode={ad?.barcode}></Title>
        </Section>
      </SectionRow>


      <SectionRow>

        <Section>
          <Header title="Summary"></Header>
          <DataRowContainer>
            <DataRow label="Asset Type" value={ad?.asset_type} />
            <DataRow label="Serial #" value={ad?.serial_number} />
            <DataRow label="Meter" value={ad?.specs?.meter_total} />
            <DataRow label="Tracking Status" value={ad?.tracking_status} />
            <DataRow label="Availability" value={ad?.availability_status} />
            <DataRow label="Technical Status" value={ad?.technical_status} />
            <DataRow label="Warehouse" value={ad?.warehouse_code} />
            <DataRow label="Location" value={ad?.location} />
            <DataRow label="Created At" value={ad?.created_at} />
          </DataRowContainer>
        </Section>

        <Section>
          <Header title="Pricing"></Header>
          <DataRowContainer>
            <DataRow label="Purchase Cost" value={ad?.cost.purchase_cost} curr={true} />
            <DataRow label="Transport Cost" value={ad?.cost.transport_cost} curr={true} />
            <DataRow label="Processing Cost" value={ad?.cost.processing_cost} curr={true} />
            <DataRow label="Other Cost" value={ad?.cost.other_cost} curr={true} />
            <DataRow label="Parts Cost" value={ad?.cost.parts_cost} curr={true} />
            <DataRow label="Total Cost" value={ad?.cost.total_cost} curr={true} />
            <DataRow label="Sale Price" value={ad?.cost.sale_price} curr={true} />
          </DataRowContainer>
        </Section>

        <Section>
          <Header title="Hold"></Header>
          <DataRowContainer>
            <DataRow label="Date" value={ad?.hold.created_at}></DataRow>
            <DataRow label="Customer" value={ad?.hold.customer}></DataRow>
            <DataRow label="For" value={ad?.hold.created_for}></DataRow>
            <DataRow label="By" value={ad?.hold.created_by}></DataRow>
            <DataRow label="Notes" value={ad?.hold.notes}></DataRow>
            <DataRow label="Hold#" value={ad?.hold.hold_number}></DataRow>
          </DataRowContainer>
        </Section>


      </SectionRow>

      <SectionRow>
        <Section>

          <Header title="Specifications"></Header>
          <DataRowContainer>
            <DataRow label="Cassettes" value={ad?.specs.cassettes} />
            <DataRow label="Internal Finisher" value={ad?.specs.internal_finisher} />
            <CMYKRow label="Drum Life" c_value={ad?.specs.drum_life_c} m_value={ad?.specs.drum_life_m} y_value={ad?.specs.drum_life_y} k_value={ad?.specs.drum_life_k} />

          </DataRowContainer>
        </Section>
      </SectionRow>

      <SectionRow>
        <Section>
          <Header title="Arrival"></Header>
          <DataRowContainer>
            <DataRow label="Arrived On" value={ad?.arrival.created_at}></DataRow>
            <DataRow label="Vendor" value={ad?.arrival.origin}></DataRow>
            <DataRow label="Warehouse" value={ad?.arrival.destination_code}></DataRow>
            <DataRow label="Arrival #" value={ad?.arrival.arrival_number}></DataRow>
            <DataRow label="Transporter" value={ad?.arrival.transporter}></DataRow>
            <DataRow label="Invoice #" value={ad?.purchase_invoice.invoice_number}></DataRow>
            <DataRow label="Is Cleared" value={ad?.purchase_invoice.is_cleared}></DataRow>
          </DataRowContainer>
        </Section>
      </SectionRow>



    </DetailsContainer>
  )
}