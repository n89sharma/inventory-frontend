import type { AssetSummary } from '@/data/api/asset-api'
import type { Model } from '@/data/api/model-api'
import type { Status, Warehouse } from '@/data/api/constants-api'
import { create } from 'zustand'
import { ANY_OPTION, type SelectOption } from '@/types/select-option-types'

interface QueryStore {
  assets: AssetSummary[]
  model: Model | null
  meter: number | null
  availabilityStatus: SelectOption<Status>
  technicalStatus: SelectOption<Status>
  warehouse: SelectOption<Warehouse>
  hasSearched: boolean

  setAssets: (assets: AssetSummary[]) => void
  setModel: (model: Model | null) => void
  setMeter: (meter: number | null) => void
  setAvailabilityStatus: (status: SelectOption<Status>) => void
  setTechnicalStatus: (status: SelectOption<Status>) => void
  setWarehouse: (warehouse: SelectOption<Warehouse>) => void
  setHasSearched: (hasSearched: boolean) => void
}

export const useQueryStore = create<QueryStore>((set) => ({
  assets: [],
  model: null,
  meter: null,
  availabilityStatus: ANY_OPTION,
  technicalStatus: ANY_OPTION,
  warehouse: ANY_OPTION,
  hasSearched: false,

  setAssets: (assets) => set({ assets }),
  setModel: (model) => set({ model }),
  setMeter: (meter) => set({ meter }),
  setAvailabilityStatus: (availabilityStatus) => set({ availabilityStatus }),
  setTechnicalStatus: (technicalStatus) => set({ technicalStatus }),
  setWarehouse: (warehouse) => set({ warehouse }),
  setHasSearched: (hasSearched) => set({ hasSearched }),
}))
