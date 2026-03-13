import type { SelectOption } from "@/types/select-option-types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getIdOrNullFromSelection(selection: SelectOption<any>) {
  if (selection.state === 'SELECTED') {
    return selection.selected.id
  }
  return null
}