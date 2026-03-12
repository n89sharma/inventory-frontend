import { useState } from 'react'
import { Button } from "@/components/shadcn/button"
import { getAssetsForQuery } from "@/data/api/asset-api"
import { useAssetStore } from "@/data/store/asset-store"
import { DataTable } from "../shadcn/data-table"
import { DropdownSelectType } from '../custom/dropdown-select-type'
import { useConstantsStore } from '@/data/store/constants-store'
import { InputWithClear } from '../custom/input-with-clear'
import { PopoverSearch } from '../custom/popover-search'
import type { Model } from '@/data/api/model-api'
import { useModelStore } from '@/data/store/model-store'
import { assetSummaryTableColumns } from './column-defs/asset-summary-columns'

export function QueryPage(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState({
    brand: '',
    model: '',
    availabilityStatusId: 0,
    technicalStatusId: 0,
    warehouseId: 0,
    meter: null
  })
  const [loading, setLoading] = useState(false)
  const models = useModelStore((state) => state.models)
  const availabilityStatuses = addAnyOption(useConstantsStore((state) => state.availabilityStatuses))
  const technicalStatuses = addAnyOption(useConstantsStore((state) => state.technicalStatuses))
  const warehouses = [{ id: 0, city_code: 'Any', street: '', is_active: true }, ...useConstantsStore((state) => state.warehouses)]
  const assets = useAssetStore((state) => state.assets)
  const setAssets = useAssetStore((state) => state.setAssets)

  function addAnyOption(arr: any[]) {
    return [{ id: 0, status: 'Any' }, ...arr]
  }

  function handleSearchQueryUpdate(field: string, value: string | number | null) {
    setSearchQuery(prev => ({
      ...prev,
      [field]: value
    }))
  }

  async function submitQuery() {
    setLoading(true)
    try {
      if (searchQuery.model && !!searchQuery.model.trim()) {
        setAssets(await getAssetsForQuery(searchQuery))
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <form
        className="flex flex-row gap-2 border rounded-md p-2 items-end"
        onSubmit={e => e.preventDefault()}
      >

        <PopoverSearch
          value={null}
          onSelection={m => {
            handleSearchQueryUpdate('brand', m.brand_name)
            handleSearchQueryUpdate('model', m.model_name)
          }}
          onClear={() => {
            handleSearchQueryUpdate('brand', null)
            handleSearchQueryUpdate('model', null)
          }}
          allOptions={models}
          searchKey='model_name'
          displayString={(m: Model) => `${m.brand_name} ${m.model_name}`}
          fieldLabel='Model'
          fieldRequired={true}
        >
        </PopoverSearch>

        <DropdownSelectType
          fieldLabel='Availability'
          value={searchQuery.availabilityStatusId.toString()}
          options={availabilityStatuses.map(s => ({ id: s.id, label: s.status }))}
          onSelection={id => handleSearchQueryUpdate('availabilityStatusId', id)}
          className='max-w-36'
        />

        <DropdownSelectType
          fieldLabel='Testing Status'
          value={searchQuery.technicalStatusId.toString()}
          options={technicalStatuses.map(s => ({ id: s.id, label: s.status }))}
          onSelection={id => handleSearchQueryUpdate('technicalStatusId', id)}
          className='max-w-36'
        />

        <DropdownSelectType
          fieldLabel='Warehouse'
          value={searchQuery.warehouseId.toString()}
          options={warehouses.filter(w => w.is_active).map(w => ({ id: w.id, label: w.city_code }))}
          onSelection={id => handleSearchQueryUpdate('warehouseId', id)}
          className='max-w-36'
        />

        <InputWithClear
          value={searchQuery.meter}
          onSelection={meter => handleSearchQueryUpdate('meter', meter)}
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
