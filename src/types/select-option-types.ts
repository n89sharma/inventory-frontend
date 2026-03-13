export type SelectOption<T> =
  | { state: 'SELECTED'; selected: T }
  | { state: 'UNSELECTED' }
  | { state: 'ANY' }

export const ANY_OPTION: SelectOption<never> = { state: 'ANY' }
export const UNSELECTED: SelectOption<never> = { state: 'UNSELECTED' }