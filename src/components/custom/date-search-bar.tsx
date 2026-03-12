import React from 'react'
import { subDays } from "date-fns"
import { Button } from "@/components/shadcn/button"
import { DatePickerField } from './date-picker'
import { Field, FieldGroup, FieldLabel } from "@/components/shadcn/field"
import { QuickSearchButtons } from './quick-search-buttons'

interface DateSearchBarProps {
  fromDate: Date | undefined
  toDate: Date | undefined
  setFromDate: (date: Date | undefined) => void
  setToDate: (date: Date | undefined) => void
  onSearchSetData: (from: Date, to: Date) => Promise<void>
}

export function DateSearchBar({ fromDate, toDate, setFromDate, setToDate, onSearchSetData }: DateSearchBarProps): React.JSX.Element {

  async function handleSearch() {
    if (!fromDate) return
    const to = toDate ?? new Date()
    setToDate(to)
    await onSearchSetData(fromDate, to)
  }

  async function handleQuickSearch(days: number) {
    const from = subDays(new Date(), days)
    const to = new Date()
    setFromDate(from)
    setToDate(to)
    await onSearchSetData(from, to)
  }

  return (
    <FieldGroup className="flex flex-col gap-2 border rounded-md p-2 max-w-96">
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
        />

        <DatePickerField
          label="To Date"
          id="to-date"
          date={toDate}
          setDate={setToDate}
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
