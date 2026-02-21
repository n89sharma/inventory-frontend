import React, { useState } from 'react'
import { subDays } from "date-fns"
import { Button } from "@/components/shadcn/button"
import { DataTable } from "@/components/shadcn/data-table"
import type { ColumnDef } from '@tanstack/react-table'
import { DatePickerField } from '../ui/date-picker-field'
import { FieldGroup } from "@/components/shadcn/field"

interface CollectionPageProps<T> {
  collection: T[],
  onSearchSetData: (from: Date, to: Date) => Promise<void>,
  columns: ColumnDef<T>[]
}

export function CollectionPage<T>({
  collection,
  onSearchSetData,
  columns
}: CollectionPageProps<T>): React.JSX.Element {

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
    <div className="flex flex-col gap-2">
      <FieldGroup className="flex flex-row gap-2 max-w-96 border rounded-md p-2 items-end">
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
          className="rounded-md"
          onClick={handleSearch}
        >Search</Button>
      </FieldGroup>
      <div>
        <Button variant="secondary" className="rounded-r-none" onClick={() => handleQuickSearch(1)}>1d</Button>
        <Button variant="secondary" className="rounded-none" onClick={() => handleQuickSearch(7)}>7d</Button>
        <Button variant="secondary" className="rounded-l-none" onClick={() => handleQuickSearch(30)}>30d</Button>
      </div>
      <DataTable columns={columns} data={collection} />
    </div>
  )
}
