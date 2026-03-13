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

export type SelectOption<T> =
  | { state: 'SELECTED'; selected: T }
  | { state: 'UNSELECTED' }
  | { state: 'ANY' }

export const ANY_OPTION: SelectOption<never> = { state: 'ANY' }
export const UNSELECTED: SelectOption<never> = { state: 'UNSELECTED' }

interface EntityWithId {
  id: number
}

type SelectOptionsProps<T extends EntityWithId> = {
  selection: SelectOption<T>
  onSelectionChange: (selection: SelectOption<T>) => void
  options: T[]
  getLabel: (entity: T) => string
  fieldLabel: string
  anyAllowed?: boolean
  fieldRequired?: boolean
  error?: boolean
  className?: string
}

export function SelectOptions<T extends EntityWithId>({
  fieldLabel,
  selection,
  options,
  onSelectionChange,
  getLabel,
  anyAllowed,
  fieldRequired,
  error,
  className }: SelectOptionsProps<T>): React.JSX.Element {


  function getValueFromSelection(selection: SelectOption<T>) {
    if (selection.state === 'SELECTED') {
      return selection.selected.id.toString()
    }
    return selection.state
  }

  function getSelectionFromId(id: string): SelectOption<T> {
    if (id === 'ANY')
      return ANY_OPTION
    const warehouse = options.find(o => o.id === parseInt(id))
    if (warehouse) {
      return {
        state: 'SELECTED',
        selected: warehouse
      }
    }
    return UNSELECTED
  }

  return (
    <Field className={className} data-invalid={error}>
      <FieldLabel>
        {fieldLabel}
        {fieldRequired && <span className="text-destructive">*</span>}
      </FieldLabel>
      <Select
        value={getValueFromSelection(selection)}
        onValueChange={id => onSelectionChange(getSelectionFromId(id))}
      >
        <SelectTrigger aria-invalid={error}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            {anyAllowed && <SelectItem key="ANY" value="ANY">Any</SelectItem>}
            {options?.map(o => (
              <SelectItem key={o.id} value={o.id.toString()}>{getLabel(o)}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  )
}
