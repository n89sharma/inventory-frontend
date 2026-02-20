import { useState, useEffect } from 'react'
import { CMYKRow, DataRow, DataRowContainer, DetailsContainer, Header, Section, SectionRow, AssetTitle, AccessoryRow, ErrorRow, ErrorHeader, InvoiceClearedRow, PartsHeader } from '@/components/ui/asset-detail'
import { useAssetStore } from "@/store/asset-store"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/tabs"
import { Button } from '@/components/shadcn/button'
import { Comment } from '@/components/layout/comment'
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'

export const AssetDetailsPage = () => {

  const ad = useAssetStore((state) => state.assetDetails)
  const aa = useAssetStore((state) => state.accessories)
  const ae = useAssetStore((state) => state.errors)
  const ac = useAssetStore((state) => state.comments)
  const at = useAssetStore((state) => state.transfers)
  const ap = useAssetStore((state) => state.parts)


  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setCurrentIndex(0)
  }, [at])

  function handleNextTransfer() {
    if (at.length === 0) return
    setCurrentIndex((prev) => (prev + 1) % at.length)
  }

  function handlePreviousTransfer() {
    if (at.length === 0) return
    setCurrentIndex((prev) => (prev - 1 + at.length) % at.length)
  }

  const currTransfer = at[currentIndex] || null


  return (

    <DetailsContainer>

      <SectionRow className="flex-col">
        <Section>
          <AssetTitle brand={ad?.brand} model={ad?.model} barcode={ad?.barcode}></AssetTitle>
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
            <AccessoryRow label="Core Functions" accessories={aa ?? []}></AccessoryRow>
          </DataRowContainer>
        </Section>

        <Section>
          <Header title="Errors"></Header>
          <ErrorHeader />
          <DataRowContainer>
            {ae?.map((e) => <ErrorRow error={e}></ErrorRow>)}
          </DataRowContainer>
        </Section>

        <Section>
          <Header title="Installed Parts" />
          <PartsHeader />
          {ap?.map((p) => <DataRow label={p.part} value={p.donor} />)}
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
            <InvoiceClearedRow isCleared={!!ad?.purchase_invoice.is_cleared} />
          </DataRowContainer>
        </Section>

        <Section>
          <div className="flex items-center">
            <Header title="Transfer" />
            <div className={`flex items-center justify-between w-full ml-10 ${!at.length && "hidden"}`}>
              <span className="text-sm font-medium text-muted-foreground">{`${currentIndex + 1}/${at.length}`}</span>
              <div>
                <Button variant="outline" size="xs" onClick={handlePreviousTransfer}>
                  <CaretLeftIcon weight="fill" />
                </Button>
                <Button variant="outline" size="xs" onClick={handleNextTransfer}>
                  <CaretRightIcon weight="fill" />
                </Button>
              </div>
            </div>
          </div>
          <DataRowContainer>
            <DataRow label="Transferred On" value={currTransfer ? currTransfer.created_at : '-'}></DataRow>
            <DataRow label="Source" value={currTransfer ? currTransfer.source_code : '-'}></DataRow>
            <DataRow label="Destination" value={currTransfer ? currTransfer.destination_code : '-'}></DataRow>
            <DataRow label="Transfer #" value={currTransfer ? currTransfer.transfer_number : '-'}></DataRow>
            <DataRow label="Transporter" value={currTransfer ? currTransfer.transporter : '-'}></DataRow>
          </DataRowContainer>
        </Section>

        <Section>
          <Header title="Departure"></Header>
          <DataRowContainer>
            <DataRow label="Departed On" value={ad?.departure?.created_at}></DataRow>
            <DataRow label="Warehouse" value={ad?.departure?.origin_code}></DataRow>
            <DataRow label="Customer" value={ad?.departure?.destination}></DataRow>
            <DataRow label="Departure #" value={ad?.departure?.departure_number}></DataRow>
            <DataRow label="Transporter" value={ad?.departure?.transporter}></DataRow>
          </DataRowContainer>
        </Section>

      </SectionRow>

      <Tabs defaultValue="comments">
        <TabsList variant="line">
          <TabsTrigger value="comments"><Header title="Comments" /></TabsTrigger>
          <TabsTrigger value="history"><Header title="History" /></TabsTrigger>
        </TabsList>
        <TabsContent value="comments" className="flex flex-col gap-3">
          {ac?.map((c) => (<Comment
            user={c.username}
            date={c.created_at}
            avatarFallback={c.initials}
            comment={c.comment}
            tags={[]}
          />))}
        </TabsContent>
      </Tabs>

    </DetailsContainer>
  )
}