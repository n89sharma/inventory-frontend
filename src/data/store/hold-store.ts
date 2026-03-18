import type { Hold } from '@/data/api/hold-api'
import { create } from 'zustand'
import type { User } from '../api/user-api'
import { ANY_OPTION, type SelectOption } from '@/types/select-option-types'

interface HoldStore {
  holds: Hold[]
  loading: boolean
  fromDate: Date | undefined
  toDate: Date | undefined
  holdBy: SelectOption<User>
  holdFor: SelectOption<User>
  hasSearched: boolean

  setHolds: (holds: Hold[]) => void
  setLoading: (loading: boolean) => void
  setFromDate: (date: Date | undefined) => void
  setToDate: (date: Date | undefined) => void
  setHoldBy: (v: SelectOption<User>) => void
  setHoldFor: (v: SelectOption<User>) => void
  setHasSearched: (hasSearched: boolean) => void

  clearHolds: () => void
}

export const useHoldStore = create<HoldStore>((set) => ({
  holds: [],
  loading: false,
  fromDate: undefined,
  toDate: undefined,
  holdBy: ANY_OPTION,
  holdFor: ANY_OPTION,
  hasSearched: false,

  setHolds: (holds) => set({ holds }),
  setLoading: (loading) => set({ loading }),
  setFromDate: (fromDate) => set({ fromDate }),
  setToDate: (toDate) => set({ toDate }),
  setHoldBy: (holdBy) => set({ holdBy }),
  setHoldFor: (holdFor) => set({ holdFor }),
  setHasSearched: (hasSearched) => set({ hasSearched }),
  clearHolds: () => set({ holds: [] })
}))
