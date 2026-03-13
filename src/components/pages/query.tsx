import { useState } from 'react'
import { Button } from "@/components/shadcn/button"
import { getAssetsForQuery } from "@/data/api/asset-api"
import { useAssetStore } from "@/data/store/asset-store"
import { DataTable } from "../shadcn/data-table"
import { useConstantsStore } from '@/data/store/constants-store'
import { InputWithClear } from '../custom/input-with-clear'
import { PopoverSearch } from '../custom/popover-search'
import type { Model } from '@/data/api/model-api'
import { useModelStore } from '@/data/store/model-store'
import { assetSummaryTableColumns } from './column-defs/asset-summary-columns'
import type { Status, Warehouse } from '@/data/api/constants-api'
import { type SelectOption, ANY_OPTION } from '@/types/select-option-types'
import { SelectOptions } from '../custom/select-options'

export function QueryPage(): React.JSX.Element {
  const [model, setModel] = useState<Model | null>()
  const [meter, setMeter] = useState<number | null>(null)
  const [availabilityStatus, setAvailabilityStatus] = useState<SelectOption<Status>>(ANY_OPTION)
  const [technicalStatus, setTechnicalStatus] = useState<SelectOption<Status>>(ANY_OPTION)
  const [warehouse, setWarehouse] = useState<SelectOption<Warehouse>>(ANY_OPTION)
  const [loading, setLoading] = useState(false)

  const models = useModelStore((state) => state.models)
  const availabilityStatuses = useConstantsStore((state) => state.availabilityStatuses)
  const technicalStatuses = useConstantsStore((state) => state.technicalStatuses)
  const warehouses = useConstantsStore((state) => state.warehouses)
  const activeWarehouses = warehouses.filter(w => w.is_active)

  const assets = useAssetStore((state) => state.assets)
  const setAssets = useAssetStore((state) => state.setAssets)

  async function submitQuery() {
    setLoading(true)
    try {
      if (model) {
        setAssets(await getAssetsForQuery(model, meter, availabilityStatus, technicalStatus, warehouse))
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold p-2">
        Query
      </h1>
      <form
        className="flex flex-row gap-2 border rounded-md p-2 items-end"
        onSubmit={e => e.preventDefault()}
      >

        <PopoverSearch
          selection={null}
          onSelectionChange={setModel}
          onClear={() => setModel(null)}
          options={models}
          searchKey='model_name'
          getLabel={m => `${m.brand_name} ${m.model_name}`}
          fieldLabel='Model'
          fieldRequired={true}
        />

        <SelectOptions
          selection={availabilityStatus}
          onSelectionChange={setAvailabilityStatus}
          options={availabilityStatuses}
          getLabel={s => s.status}
          fieldLabel='Availability'
          anyAllowed={true}
          className='max-w-36'
        />

        <SelectOptions
          selection={technicalStatus}
          onSelectionChange={setTechnicalStatus}
          options={technicalStatuses}
          getLabel={s => s.status}
          fieldLabel='Testing Status'
          anyAllowed={true}
          className='max-w-36'
        />

        <SelectOptions
          selection={warehouse}
          onSelectionChange={setWarehouse}
          options={activeWarehouses}
          getLabel={w => w.city_code}
          fieldLabel='Warehouse'
          anyAllowed={true}
          className='max-w-36'
        />

        <InputWithClear
          valueType='number'
          value={meter}
          onValueChange={val => setMeter(typeof val === 'string' ? null : val)}
          fieldLabel='Meter'
          className='max-w-36'
        >
        </InputWithClear>

        <Button
          className="rounded-md"
          onClick={submitQuery}
          type="submit"
        >
          Search
        </Button>
      </form>
      <div hidden={!loading}>
        <span>Loading...</span>
      </div>
      <DataTable columns={assetSummaryTableColumns} data={assets} />
    </div>
  )
}
