import type { AssetDetails } from '@/services/api'
import { create } from 'zustand'

interface SearchState {
  assetDetails: AssetDetails | null
  setAssetDetails: (val: AssetDetails) => void
  clearSearch: () => void
}

export const useSearchStore = create<SearchState>((set) => ({
  assetDetails: null,
  setAssetDetails: (val) => set({ assetDetails: val }),
  clearSearch: () => set({ assetDetails: null }),
}))