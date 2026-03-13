import React from 'react'
import { subDays } from "date-fns"
import { Button } from "@/components/shadcn/button"
import { DatePickerField } from './date-picker'
import { Field, FieldGroup, FieldLabel } from "@/components/shadcn/field"
import { QuickSearchButtons } from './quick-search-buttons'
import { useConstantsStore } from '@/data/store/constants-store'
import type { Warehouse } from '@/data/api/constants-api'
import { ANY_OPTION, type SelectOption } from '@/types/select-option-types'
import { SelectOptions } from './select-options'

export interface SearchCriteria {
  fromDate: Date | undefined
  toDate: Date | undefined
  warehouse: SelectOption<Warehouse>
  setFromDate: (date: Date | undefined) => void
  setToDate: (date: Date | undefined) => void
  setWarehouse: (warehouse: SelectOption<Warehouse>) => void
}

interface SearchBarProps {
  criteria: SearchCriteria
  onSearchSetData: (from: Date, to: Date, warehouse: SelectOption<Warehouse>) => Promise<void>
}

export function SearchBar({ criteria, onSearchSetData }: SearchBarProps): React.JSX.Element {
  const { fromDate, toDate, warehouse, setFromDate, setToDate, setWarehouse } = criteria
  const warehouses = useConstantsStore((state) => state.warehouses)
  const activeWarehouses = warehouses.filter(w => w.is_active)

  async function handleSearch() {
    if (!fromDate) return
    const to = toDate ?? new Date()
    const war = warehouse ?? ANY_OPTION
    setToDate(to)
    setWarehouse(war)
    await onSearchSetData(fromDate, to, war)
  }

  async function handleQuickSearch(days: number) {
    const from = subDays(new Date(), days)
    const to = new Date()
    setFromDate(from)
    setToDate(to)
    setWarehouse(ANY_OPTION)
    await onSearchSetData(from, to, ANY_OPTION)
  }

  return (
    <FieldGroup className="flex flex-col gap-2 border rounded-md p-2">
      <Field>
        <FieldLabel>Quick Search</FieldLabel>
        <QuickSearchButtons days={[7, 30, 60]} onSearch={handleQuickSearch} />
      </Field>

      <div className="flex flex-row gap-2 items-end">
        <DatePickerField
          label="From Date"
          id="from-date"
          date={fromDate}
          setDate={setFromDate}
          className="max-w-40"
        />

        <DatePickerField
          label="To Date"
          id="to-date"
          date={toDate}
          setDate={setToDate}
          className="max-w-40"
        />

        <SelectOptions
          selection={warehouse}
          onSelectionChange={setWarehouse}
          options={activeWarehouses}
          getLabel={w => w.city_code}
          fieldLabel='Warehouse'
          anyAllowed={true}
          className="max-w-40"
        />

        <Button
          variant="secondary"
          className="rounded-md"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
    </FieldGroup>
  )
}
