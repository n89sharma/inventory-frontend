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
  val: string
}

type DropdownSelectTypeProps = {
  fieldLabel: string
  defaultVal: string
  options: SelectOption[]
  onSelection: (value: string | null) => void
}
export function DropdownSelectType({
  fieldLabel,
  defaultVal,
  options,
  onSelection }: DropdownSelectTypeProps): React.JSX.Element {


  return (
    <Field className="w-36">
      <FieldLabel>{fieldLabel}</FieldLabel>
      <Select defaultValue={defaultVal} onValueChange={onSelection}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent
          position="popper"
        >
          <SelectGroup>
            {options?.map(o => (
              <SelectItem key={o.id} value={o.id.toString()}>{o.val}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  )
}
