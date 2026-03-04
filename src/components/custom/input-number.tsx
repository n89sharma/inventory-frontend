import { XIcon } from "@phosphor-icons/react";
import { Field, FieldLabel } from "../shadcn/field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "../shadcn/input-group";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type InputNumberProps = {
  defaultVal: string | null
  onSelection: (val: string | null) => void
  fieldLabel: string
  className?: string
  inputType?: string
}

export function InputNumber({
  defaultVal,
  onSelection,
  fieldLabel,
  className,
  inputType }: InputNumberProps): React.JSX.Element {

  const [numberInput, setNumberInput] = useState(defaultVal)

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
    <div className={cn("max-w-48", className)}>
      <Field>
        <FieldLabel>{fieldLabel}</FieldLabel>
        <InputGroup>
          <InputGroupInput
            type={inputType ?? "number"}
            value={numberInput ?? ''}
            onChange={e => handleInputChange(e.target.value)}
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
    </div>

  )
}