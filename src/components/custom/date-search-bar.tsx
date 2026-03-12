import React, { useState } from 'react'
import { subDays } from "date-fns"
import { Button } from "@/components/shadcn/button"
import { DatePickerField } from './date-picker'
import { FieldGroup } from "@/components/shadcn/field"
import { QuickSearchButtons } from './quick-search-buttons'

interface DateSearchBarProps {
  onSearchSetData: (from: Date, to: Date) => Promise<void>
}

export function DateSearchBar({ onSearchSetData }: DateSearchBarProps): React.JSX.Element {

  const [fromDate, setFromDate] = useState<Date>()
  const [toDate, setToDate] = useState<Date>()

  async function handleSearch() {
    if (!fromDate) return
    if (!toDate) {
      setToDate(new Date())
    }
    await onSearchSetData(fromDate, toDate ?? new Date())
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
      <QuickSearchButtons days={[7, 30, 60]} onSearch={handleQuickSearch} />
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
