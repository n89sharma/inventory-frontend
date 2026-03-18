import type { Status, Warehouse } from "@/data/api/constants-api";
import type { User } from "@/data/api/user-api";

export type SelectOption<T> =
  | { state: 'SELECTED'; selected: T }
  | { state: 'UNSELECTED' }
  | { state: 'ANY' }

export const ANY_OPTION: SelectOption<never> = { state: 'ANY' }
export const UNSELECTED: SelectOption<never> = { state: 'UNSELECTED' }

export function getIdOrNullFromSelection(selection: SelectOption<Warehouse | User | Status>) {
  if (selection.state === 'SELECTED') {
    return selection.selected.id
  }
  return null
}

export function getSelectedOrNull(selection: SelectOption<any>) {
  if (selection.state === 'SELECTED') {
    return selection.selected
  }
  return null
}

export function isSelected(selection: SelectOption<any>) {
  return selection.state === 'SELECTED'
}

export function getSelectOption<T>(v: T): SelectOption<T> {
  return {
    state: 'SELECTED',
    selected: v
  }
}