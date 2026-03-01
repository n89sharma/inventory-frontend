import { XCircleIcon } from "@phosphor-icons/react";
import { Field, FieldLabel } from "../shadcn/field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "../shadcn/input-group";
import type { InputProps } from "../pages/query";
import { useState } from "react";


export function InputMeter({ defaultVal, onSelection }: InputProps): React.JSX.Element {

  const [meterInput, setMeterInput] = useState(defaultVal)

  function handleMeterInputChange(meterVal: string) {
    setMeterInput(meterVal)
    if (!meterVal.trim()) {
      onSelection('meter', null)
      return
    }
    onSelection('meter', meterVal)
  }

  function clearMeterInput() {
    setMeterInput('')
    onSelection('meter', null)
  }

  return (
    <div className="max-w-48">
      <Field >
        <FieldLabel>Meter</FieldLabel>
        <InputGroup>
          <InputGroupInput
            type="number"
            value={meterInput ?? ''}
            onChange={(e) => handleMeterInputChange(e.target.value)}
          >
          </InputGroupInput>

          <InputGroupAddon align="inline-end">
            <InputGroupButton
              size="icon-sm"
              onClick={clearMeterInput}
              hidden={!meterInput || !meterInput.length}
            >
              <XCircleIcon />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>

      </Field>
    </div>

  )
}