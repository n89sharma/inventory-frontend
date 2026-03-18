import React from 'react'
import { subDays } from "date-fns"
import { Button } from "@/components/shadcn/button"
import { DatePickerField } from './date-picker'
import { Field, FieldGroup, FieldLabel } from "@/components/shadcn/field"
import { QuickSearchButtons } from './quick-search-buttons'
import { useConstantsStore } from '@/data/store/constants-store'
import { useUserStore } from '@/data/store/user-store'
import type { Warehouse } from '@/data/api/constants-api'
import type { User } from '@/data/api/user-api'
import { ANY_OPTION, type SelectOption } from '@/types/select-option-types'
import type { SearchOptions } from '@/types/search-types'
import { SelectOptions } from './select-options'

export interface SearchCriteria {
  fromDate: Date | undefined
  toDate: Date | undefined
  setFromDate: (date: Date | undefined) => void
  setToDate: (date: Date | undefined) => void
  warehouse?: SelectOption<Warehouse>
  setWarehouse?: (v: SelectOption<Warehouse>) => void
  holdBy?: SelectOption<User>
  setHoldBy?: (v: SelectOption<User>) => void
  holdFor?: SelectOption<User>
  setHoldFor?: (v: SelectOption<User>) => void
}

interface SearchBarProps {
  criteria: SearchCriteria
  onSearchSetData: (from: Date, to: Date, options: SearchOptions) => Promise<void>
  showWarehouse?: boolean
  showHeldByFor?: boolean
}

export function SearchBar({ criteria, onSearchSetData, showWarehouse, showHeldByFor }: SearchBarProps): React.JSX.Element {
  const { fromDate, toDate, setFromDate, setToDate } = criteria
  const warehouses = useConstantsStore(state => state.warehouses)
  const activeUsers = useUserStore(state => state.users)
  const activeWarehouses = warehouses.filter(w => w.is_active)

  async function handleSearch() {
    if (!fromDate) return
    const to = toDate ?? new Date()
    criteria.setToDate(to)
    const options: SearchOptions = {
      warehouse: criteria.warehouse ?? ANY_OPTION,
      holdBy: criteria.holdBy ?? ANY_OPTION,
      holdFor: criteria.holdFor ?? ANY_OPTION
    }
    await onSearchSetData(fromDate, to, options)
  }

  async function handleQuickSearch(days: number) {
    const from = subDays(new Date(), days)
    const to = new Date()
    setFromDate(from)
    setToDate(to)
    criteria.setWarehouse?.(ANY_OPTION)
    criteria.setHoldBy?.(ANY_OPTION)
    criteria.setHoldFor?.(ANY_OPTION)
    await onSearchSetData(from, to, { warehouse: ANY_OPTION, holdBy: ANY_OPTION, holdFor: ANY_OPTION })
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

        {showWarehouse && criteria.warehouse !== undefined && (
          <SelectOptions
            selection={criteria.warehouse}
            onSelectionChange={v => criteria.setWarehouse?.(v)}
            options={activeWarehouses}
            getLabel={w => w.city_code}
            fieldLabel="Warehouse"
            anyAllowed={true}
            className="max-w-40"
          />
        )}

        {showHeldByFor && criteria.holdBy !== undefined && criteria.holdFor !== undefined && (
          <>
            <SelectOptions
              selection={criteria.holdBy}
              onSelectionChange={v => criteria.setHoldBy?.(v)}
              options={activeUsers}
              getLabel={u => u.name}
              getKey={u => u.username}
              fieldLabel="Hold By"
              anyAllowed={true}
              className="max-w-40"
            />
            <SelectOptions
              selection={criteria.holdFor}
              onSelectionChange={v => criteria.setHoldFor?.(v)}
              options={activeUsers}
              getLabel={u => u.name}
              getKey={u => u.username}
              fieldLabel="Hold For"
              anyAllowed={true}
              className="max-w-40"
            />
          </>
        )}

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
