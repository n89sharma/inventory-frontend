import { useState, useMemo } from 'react'
import Fuse from 'fuse.js'
import { useModelStore } from '@/data/store/model-store'
import type { Model } from '@/data/api/model-api'
import { Input } from '../shadcn/input'
import { Field, FieldLabel } from '../shadcn/field'
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTrigger } from '../shadcn/popover'
import { ScrollArea } from '../shadcn/scroll-area'

export function ModelDropdownSelect({ onSelection }: { onSelection: (field: string, val: string) => void }): React.JSX.Element {

  const [modelOptions, setModelOptions] = useState<Model[]>([])
  const [modelInput, setModelInput] = useState('')
  const [popoverOpen, setPopoverOpen] = useState(false)
  const allModels = useModelStore((state) => state.models)

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
    console.log(modelSearchResults)
    setPopoverOpen(true)
  }

  function handleModelSelect(model: Model) {
    setModelInput(`${model.brand_name} ${model.model_name}`)
    onSelection('brand', model.brand_name)
    onSelection('model', model.model_name)
    setPopoverOpen(false)
    setModelOptions([])
  }

  return (
    <Popover
      open={popoverOpen}
      onOpenChange={setPopoverOpen}
    >
      <PopoverTrigger asChild>
        <Field className="max-w-96">
          <FieldLabel htmlFor="model-input">Model</FieldLabel>
          <Input
            id="model-input"
            value={modelInput}
            onChange={(e) => updateModelSearch(e.target.value)}
          />
        </Field>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        onOpenAutoFocus={(e) => { e.preventDefault() }}
        onCloseAutoFocus={(e) => { e.preventDefault() }}
      >
        <PopoverHeader>
          <PopoverDescription>Start typing to see suggestions...</PopoverDescription>
        </PopoverHeader>
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
  )
}