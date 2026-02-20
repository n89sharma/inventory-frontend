import { useState } from "react"
import { Button } from "@/components/shadcn/button"
import { Calendar } from "@/components/shadcn/calendar"
import { Field, FieldGroup, FieldLabel } from "@/components/shadcn/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover"
import { format, subDays } from "date-fns"
import { useArrivalStore } from "@/store/arrival-store"
import { getArrivals } from "@/api/arrival"
import type { Arrival } from "@/api/arrival"
import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "@/components/shadcn/data-table"
import { ArrowsDownUpIcon } from "@phosphor-icons/react"

export const columns: ColumnDef<Arrival>[] = [
  {
    accessorKey: "arrival_number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Arrival Number
          <ArrowsDownUpIcon />
        </Button>
      )
    },
  },
  {
    accessorKey: "created_at",
    cell: ({ getValue }) => {
      const date = getValue<Date>()
      return date ? format(date, "PPP") : "-"
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowsDownUpIcon />
        </Button>
      )
    },
  },
  {
    accessorKey: "created_by",
    header: "Created By"
  },
  {
    accessorKey: "destination_code",
    header: "Warehouse"
  },
  {
    accessorKey: "transporter",
    header: "Transporter"
  },
  {
    accessorKey: "vendor",
    header: "Vendor"
  }
]

export function ArrivalsPage() {

  const [fromDate, setFromDate] = useState<Date>()
  const [toDate, setToDate] = useState<Date>()
  const arrivals = useArrivalStore((state) => state.arrivals)
  const setArrivals = useArrivalStore((state) => state.setArrivals)

  async function handleArrivalSearch() {

    if (!fromDate) return
    if (!toDate) {
      setToDate(new Date())
    }
    setArrivals(await getArrivals(fromDate, toDate))
  }

  async function handleQuickSearch(days: number) {
    const from = subDays(new Date(), days)
    const to = new Date()
    setFromDate(from)
    setToDate(to)
    setArrivals(await getArrivals(from, to))
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
          onClick={handleArrivalSearch}
        >Search</Button>
      </FieldGroup>
      <div>
        <Button variant="secondary" className="rounded-r-none" onClick={() => handleQuickSearch(1)}>1d</Button>
        <Button variant="secondary" className="rounded-none" onClick={() => handleQuickSearch(7)}>7d</Button>
        <Button variant="secondary" className="rounded-l-none" onClick={() => handleQuickSearch(30)}>30d</Button>
      </div>
      <DataTable columns={columns} data={arrivals} />
    </div>
  )
}

interface DatePickerFieldProps {
  label: string
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  id: string
}

const DatePickerField = ({ label, date, setDate, id }: DatePickerFieldProps) => {
  return (
    <Field className="mx-auto w-44 gap-1">
      <FieldLabel className="text-xs px-1">{label}</FieldLabel>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id={id}
            className="justify-start text-muted-foreground text-xs rounded-md"
          >
            {date ? format(date, "PPP") : <span>Select</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-1" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            defaultMonth={date}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
