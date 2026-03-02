import { useState, useMemo, useRef } from 'react'
import Fuse from 'fuse.js'
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from '../shadcn/popover'
import { ScrollArea } from '../shadcn/scroll-area'
import { XCircleIcon } from '@phosphor-icons/react'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '../shadcn/input-group'
import { Field, FieldLabel } from '../shadcn/field'
import { cn } from '@/lib/utils'

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
  const inputRef = useRef<HTMLInputElement>(null)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)


  let fuse = useMemo(() => {
    return new Fuse(
      allOptions,
      {
        keys: [searchKey],
        threshold: 0.5,
        shouldSort: true
      })
  }, [allOptions])

  function updateSearch(inputVal: string) {
    setUserInput(inputVal)

    if (!inputVal.trim()) {
      setMatches([])
      setPopoverOpen(false)
      return
    }
    setMatches(fuse.search(inputVal, { limit: 6 }).map(r => r.item))
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

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {

    switch (e.key) {
      case 'ArrowDown':
        setHighlightedIndex(prev => prev < matches.length - 1 ? prev + 1 : prev)
        break

      case 'ArrowUp':
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1)
        break

      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && highlightedIndex < matches.length) {
          handleSelect(matches[highlightedIndex])
        }
        break

      case 'Escape':
        setPopoverOpen(false)
        setHighlightedIndex(-1)
        break

      case 'Tab':
        setPopoverOpen(false)
        setHighlightedIndex(-1)
        break
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
                onKeyDown={handleKeyDown}
                ref={inputRef}
                placeholder='Start typing to see suggestions...'
                required={fieldRequired}
                autoComplete="off"
                role="combobox"

              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  size="icon-sm"
                  onClick={handleClear}
                  hidden={!userInput || !userInput.length}
                  type="button"
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
          className="w-[var(--radix-popover-trigger-width)]"
        >
          <ScrollArea>
            {matches.map((m, i) => (
              <div
                key={`${displayString(m)}-${i}`}
                onClick={() => handleSelect(m)}
                onMouseDown={(e) => { e.preventDefault() }}
                className={cn(
                  "p-2 cursor-pointer rounded-sm",
                  highlightedIndex === i
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent/50"
                )}
              >
                {displayString(m)}
              </div>))}
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  )
}