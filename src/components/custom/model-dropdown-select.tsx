import { useState, useMemo, useRef } from 'react'
import Fuse from 'fuse.js'
import { useModelStore } from '@/data/store/model-store'
import type { Model } from '@/data/api/model-api'
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from '../shadcn/popover'
import { ScrollArea } from '../shadcn/scroll-area'
import { XCircleIcon } from '@phosphor-icons/react'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '../shadcn/input-group'
import { Field, FieldLabel } from '../shadcn/field'

type ModelDropdownProps = {
  defaultVal: string
  onSelection: (field: string, val: string | null) => void
}

export function ModelDropdownSelect({ defaultVal, onSelection }: ModelDropdownProps): React.JSX.Element {

  const [modelOptions, setModelOptions] = useState<Model[]>([])
  const [modelInput, setModelInput] = useState(defaultVal)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const allModels = useModelStore((state) => state.models)
  const inputRef = useRef<HTMLInputElement>(null);

  let fuse = useMemo(() => {
    return new Fuse(
      allModels,
      {
        keys: ['model_name'],
        threshold: 0.9,
      })
  }, [allModels])

  function updateModelSearch(modelVal: string) {
    setModelInput(modelVal)

    if (!modelVal.trim()) {
      setModelOptions([])
      setPopoverOpen(false)
      return
    }
    const modelSearchResults = fuse.search(modelVal).slice(0, 6).map(r => r.item)
    setModelOptions(modelSearchResults)
    setPopoverOpen(true)
  }

  function handleModelSelect(model: Model) {
    setModelInput(`${model.brand_name} ${model.model_name}`)
    onSelection('brand', model.brand_name)
    onSelection('model', model.model_name)
    setPopoverOpen(false)
    setModelOptions([])
  }

  function clearModelSelect() {
    setModelInput('')
    onSelection('brand', null)
    onSelection('model', null)
    setPopoverOpen(false)
    setModelOptions([])
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  return (
    <div>
      <Popover
        open={popoverOpen}
        onOpenChange={setPopoverOpen}
      >

        <PopoverTrigger asChild>
          <div />
        </PopoverTrigger>
        <PopoverAnchor asChild>


          <Field>
            <FieldLabel>Model</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="model-input"
                value={modelInput}
                onChange={(e) => updateModelSearch(e.target.value)}
                ref={inputRef}
                placeholder='Start typing to see suggestions...'
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  size="icon-sm"
                  onClick={clearModelSelect}
                  hidden={!modelInput.length}
                >
                  <XCircleIcon />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </PopoverAnchor>
        <PopoverContent
          align="start"
          onOpenAutoFocus={(e) => { e.preventDefault() }}
          onCloseAutoFocus={(e) => { e.preventDefault() }}
        >
          <ScrollArea>
            {modelOptions.map((m) => (
              <div
                key={`${m.brand_name}:${m.model_name}`}
                className="p-2 hover:bg-accent cursor-pointer"
                onClick={() => handleModelSelect(m)}
                onMouseDown={(e) => { e.preventDefault() }}
              >
                {m.brand_name} {m.model_name}
              </div>))}
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  )
}