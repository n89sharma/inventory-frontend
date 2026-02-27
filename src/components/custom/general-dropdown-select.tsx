import type React from "react"
import {
  Field,
  FieldGroup,
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
  val: string
}

type GeneralDropdownProps = {
  fieldDisplay: string
  defaultVal: string
  options: SelectOption[]
  onSelection: (value: string | number | null) => void
}
export function GeneralDropdownSelect({
  fieldDisplay,
  defaultVal,
  options,
  onSelection }: GeneralDropdownProps): React.JSX.Element {


  return (
    <FieldGroup className="w-36">
      <Field>
        <FieldLabel>{fieldDisplay}</FieldLabel>
        <Select defaultValue={defaultVal} onValueChange={(v) => onSelection(v)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent
            position="popper"
          >
            <SelectGroup>
              {options?.map((o) => (
                <SelectItem key={o.id} value={o.id.toString()}>{o.val}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
    </FieldGroup >
  )
}
