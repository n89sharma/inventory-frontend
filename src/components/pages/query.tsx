import { useState } from 'react'
import { Button } from "@/components/shadcn/button"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowsDownUpIcon } from "@phosphor-icons/react"
import { Link } from "react-router-dom"
import { getAssetsForQuery, type AssetSummary } from "@/data/api/asset-api"
import { useAssetStore } from "@/data/store/asset-store"
import { formatThousandsK } from "@/lib/formatters"
import { DataTable } from "../shadcn/data-table"
import { DropdownSelectType } from '../custom/dropdown-select-type'
import { useConstantsStore } from '@/data/store/constants-store'
import { InputMeter } from '../custom/input-meter'
import { PopoverSearch } from '../custom/popover-search'
import type { Model } from '@/data/api/model-api'
import { useModelStore } from '@/data/store/model-store'

export type InputProps = {
  defaultVal: string | null
  onSelection: (field: string, val: string | null) => void
}

export const assetSummaryTable: ColumnDef<AssetSummary>[] = [
  {
    accessorKey: "barcode",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Barcode
          <ArrowsDownUpIcon />
        </Button>
      )
    },
    cell: ({ row }) => (
      <Link
        to={`/assets/${row.original.barcode}`}
        className="text-primary hover:underline font-medium"
      >
        {row.getValue('barcode')}
      </Link>
    )
  },
  {
    accessorKey: "brand",
    header: "Brand"
  },
  {
    accessorKey: "model",
    header: "Model"
  },
  {
    accessorKey: "serial_number",
    header: "Serial Number"
  },
  {
    accessorKey: "meter_total",
    cell: ({ row }) => {
      return formatThousandsK(row.getValue('meter_total'))
    },
    header: "Total Meter"
  },
  {
    accessorKey: "availability_status",
    header: "Availability Status"
  },
  {
    accessorKey: "tracking_status",
    header: "Tracking Status"
  },
  {
    accessorKey: "technical_status",
    header: "Technical Status"
  },
  {
    accessorKey: "warehouse_city_code",
    header: "Warehouse"
  }
]

export function QueryPage(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState({
    brand: '',
    model: '',
    trackingStatusId: 0,
    availabilityStatusId: 0,
    technicalStatusId: 0,
    warehouseId: 0,
    meter: null
  })
  const [loading, setLoading] = useState(false)
  const assets = useAssetStore((state) => state.assets)
  const setAssets = useAssetStore((state) => state.setAssets)
  const availabilityStatuses = useConstantsStore((state) => state.availabilityStatuses)
  const technicalStatuses = useConstantsStore((state) => state.technicalStatuses)
  const warehouses = useConstantsStore((state) => state.warehouses)
  const models = useModelStore((state) => state.models)

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

  function getDefaultModelVal() {
    if (!!searchQuery.brand && !!searchQuery.model) {
      return `${searchQuery.brand} ${searchQuery.model}`
    }
    return ''
  }

  return (
    <div className="flex flex-col gap-2">
      <form
        className="flex flex-row gap-2 border rounded-md p-2 items-end"
        onSubmit={(e) => e.preventDefault()}
      >

        <PopoverSearch
          defaultVal={getDefaultModelVal()}
          onSelection={(m: Model | null) => {
            if (m) {
              handleSearchQueryUpdate('brand', m.brand_name)
              handleSearchQueryUpdate('model', m.model_name)
            }
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
          defaultVal={searchQuery.availabilityStatusId.toString()}
          options={availabilityStatuses.map((s) => ({ id: s.id, val: s.status }))}
          onSelection={(id) => handleSearchQueryUpdate('availabilityStatusId', id)}
        />

        <DropdownSelectType
          fieldLabel='Testing Status'
          defaultVal={searchQuery.technicalStatusId.toString()}
          options={technicalStatuses.map((s) => ({ id: s.id, val: s.status }))}
          onSelection={(id) => handleSearchQueryUpdate('technicalStatusId', id)}
        />

        <DropdownSelectType
          fieldLabel='Warehouse'
          defaultVal={searchQuery.warehouseId.toString()}
          options={warehouses.map((w) => ({ id: w.id, val: w.city_code }))}
          onSelection={(id) => handleSearchQueryUpdate('warehouseId', id)}
        />

        <InputMeter
          defaultVal={searchQuery.meter}
          onSelection={handleSearchQueryUpdate}
        >
        </InputMeter>

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
      <DataTable columns={assetSummaryTable} data={assets} />
    </div>
  )
}
