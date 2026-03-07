import { XIcon } from "@phosphor-icons/react"
import { Field, FieldLabel } from "../shadcn/field"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "../shadcn/input-group"
import { useState } from "react"

export type InputWithClearProps = {
  value: string | null
  onSelection: (val: string | null) => void
  fieldLabel: string
  fieldRequired?: boolean
  error?: boolean
  className?: string
  inputType?: string
}

export function InputWithClear({
  value,
  onSelection,
  fieldLabel,
  fieldRequired,
  error,
  className,
  inputType }: InputWithClearProps): React.JSX.Element {

  const [numberInput, setNumberInput] = useState(value)

  function handleInputChange(val: string) {
    setNumberInput(val)
    if (!val.trim()) {
      onSelection(null)
      return
    }
    onSelection(val)
  }

  function clearInput() {
    setNumberInput('')
    onSelection(null)
  }

  return (
    <Field className={className} data-invalid={error}>
      <FieldLabel>
        {fieldLabel}
        {fieldRequired && <span className="text-destructive">*</span>}
      </FieldLabel>
      <InputGroup>
        <InputGroupInput
          type={inputType ?? "number"}
          value={numberInput ?? ''}
          onChange={e => handleInputChange(e.target.value)}
          aria-invalid={error}
        >
        </InputGroupInput>

        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-sm"
            onClick={clearInput}
            hidden={!numberInput || !numberInput.length}
          >
            <XIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}