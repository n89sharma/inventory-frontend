import type { AssetDetails, Comment, Error } from '@/services/api'
import { create } from 'zustand'

interface AssetState {
  //entities
  assetDetails: AssetDetails | null
  accessories: string[] | null
  errors: Error[] | null
  comments: Comment[] | null
  
  //actions
  setAssetDetails: (val: AssetDetails) => void
  setAssetAccessories: (val: string[]) => void
  setAssetErrors: (val: Error[]) => void
  setAssetComments: (val: Comment[]) => void

  //clear state
  clearAssetDetails: () => void
}

export const useAssetStore = create<AssetState>((set) => ({
  assetDetails: null,
  accessories: null,
  errors: null,
  comments: null,

  setAssetDetails: (val) => set({ assetDetails: val }),
  setAssetAccessories: (val) => set({ accessories: val}),
  setAssetErrors: (val) => set({ errors: val}),
  setAssetComments: (val) => set({ comments: val}),

  clearAssetDetails: () => set({ 
    assetDetails: null,
    accessories: null,
    errors: null,
    comments: null
  })
}))