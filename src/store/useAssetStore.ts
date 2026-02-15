import type { AssetDetails } from '@/services/api'
import { create } from 'zustand'

interface AssetState {
  //entities
  assetDetails: AssetDetails | null
  accessories: string[] | null
  
  //actions
  setAssetDetails: (val: AssetDetails) => void
  setAssetAccessories: (val: string[]) => void

  //clear state
  clearAssetDetails: () => void
}

export const useAssetStore = create<AssetState>((set) => ({
  assetDetails: null,
  accessories: null,

  setAssetDetails: (val) => set({ assetDetails: val }),
  setAssetAccessories: (val) => set({ accessories: val}),

  clearAssetDetails: () => set({ 
    assetDetails: null,
    accessories: null
  })
}))