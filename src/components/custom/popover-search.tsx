import { useState, useMemo, useRef } from 'react'
import Fuse from 'fuse.js'
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from '../shadcn/popover'
import { ScrollArea } from '../shadcn/scroll-area'
import { XCircleIcon } from '@phosphor-icons/react'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '../shadcn/input-group'
import { Field, FieldLabel } from '../shadcn/field'

export type PopoverSearchProps<T> = {
  defaultVal: string | null
  onSelection: (i: T | null) => void
  onClear: () => void
  allOptions: T[]
  searchKey: string
  displayString: (i: T) => string
  fieldLabel: string
  fieldRequired: boolean
}

export function PopoverSearch<T>({
  defaultVal,
  onSelection,
  onClear,
  allOptions,
  searchKey,
  displayString,
  fieldLabel,
  fieldRequired }: PopoverSearchProps<T>): React.JSX.Element {

  const [matches, setMatches] = useState<T[]>([])
  const [userInput, setUserInput] = useState(defaultVal)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null);

  let fuse = useMemo(() => {
    return new Fuse(
      allOptions,
      {
        keys: [searchKey],
        threshold: 0.9,
      })
  }, [allOptions])

  function updateSearch(inputVal: string) {
    setUserInput(inputVal)

    if (!inputVal.trim()) {
      setMatches([])
      setPopoverOpen(false)
      return
    }
    setMatches(fuse.search(inputVal).slice(0, 6).map(r => r.item))
    setPopoverOpen(true)
  }

  function handleSelect(item: T) {
    setUserInput(displayString(item))
    onSelection(item)
    setPopoverOpen(false)
    setMatches([])
  }

  function handleClear() {
    setUserInput('')
    onClear()
    setPopoverOpen(false)
    setMatches([])
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
            <FieldLabel>{fieldLabel}</FieldLabel>
            <InputGroup>
              <InputGroupInput
                value={userInput ?? ''}
                onChange={(e) => updateSearch(e.target.value)}
                ref={inputRef}
                placeholder='Start typing to see suggestions...'
                required={fieldRequired}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  size="icon-sm"
                  onClick={handleClear}
                  hidden={!userInput || !userInput.length}
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
            {matches.map((m) => (
              <div
                key={displayString(m)}
                className="p-2 hover:bg-accent cursor-pointer"
                onClick={() => handleSelect(m)}
                onMouseDown={(e) => { e.preventDefault() }}
              >
                {displayString(m)}
              </div>))}
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  )
}