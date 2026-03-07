import type React from "react"
import {
  Field,
  FieldLabel
} from "@/components/shadcn/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select"

type SelectOption = {
  id: number,
  label: string
}

type DropdownSelectTypeProps = {
  fieldLabel: string
  value: string
  options: SelectOption[]
  onSelection: (value: string | null) => void
  fieldRequired?: boolean
  error?: boolean
  className?: string
}
export function DropdownSelectType({
  fieldLabel,
  value,
  options,
  onSelection,
  fieldRequired,
  error,
  className }: DropdownSelectTypeProps): React.JSX.Element {


  return (
    <Field className={className} data-invalid={error}>
      <FieldLabel>
        {fieldLabel}
        {fieldRequired && <span className="text-destructive">*</span>}
      </FieldLabel>
      <Select
        value={value}
        onValueChange={onSelection}
      >
        <SelectTrigger aria-invalid={error}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            {options?.map(o => (
              <SelectItem key={o.id} value={o.id.toString()}>{o.label}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  )
}
