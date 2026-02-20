import { useState } from "react"
import { Button } from "@/components/shadcn/button"
import { Calendar } from "@/components/shadcn/calendar"
import { Field, FieldGroup, FieldLabel } from "@/components/shadcn/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover"
import { format } from "date-fns"
import { useArrivalStore } from "@/store/arrival-store"
import { getArrivals } from "@/api/arrival"
import type { Arrival } from "@/api/arrival"
import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "../shadcn/data-table"
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

  return (
    <div className="flex flex-col gap-4">
      <FieldGroup className="flex flex-row gap-2 max-w-96">
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
          onClick={handleArrivalSearch}
        >Search</Button>
      </FieldGroup>
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
    <Field className="mx-auto w-44">
      <FieldLabel>{label}</FieldLabel>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id={id}
            className="justify-start text-muted-foreground text-xs"
          >
            {date ? format(date, "PPP") : <span>Select</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
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
