import { Calendar } from "@/components/shadcn/calendar"
import { Field, FieldLabel } from "@/components/shadcn/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover"
import { Button } from "@/components/shadcn/button"
import { format } from "date-fns"

interface DatePickerFieldProps {
  label: string
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  id: string
}

export function DatePickerField({ label, date, setDate, id }: DatePickerFieldProps): React.JSX.Element {
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
