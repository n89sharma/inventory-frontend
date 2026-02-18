import type { AssetDetails, Comment, Error, Transfer } from '@/services/api'
import { create } from 'zustand'

interface AssetState {
  //entities
  assetDetails: AssetDetails | null
  accessories: string[]
  errors: Error[]
  comments: Comment[]
  transfers: Transfer[]
  
  //actions
  setAssetDetails: (val: AssetDetails) => void
  setAssetAccessories: (val: string[]) => void
  setAssetErrors: (val: Error[]) => void
  setAssetComments: (val: Comment[]) => void
  setAssetTransfers: (val: Transfer[]) => void

  //clear state
  clearAssetDetails: () => void
}

export const useAssetStore = create<AssetState>((set) => ({
  assetDetails: null,
  accessories: [],
  errors: [],
  comments: [],
  transfers: [],

  setAssetDetails: (val) => set({ assetDetails: val }),
  setAssetAccessories: (val) => set({ accessories: val}),
  setAssetErrors: (val) => set({ errors: val}),
  setAssetComments: (val) => set({ comments: val}),
  setAssetTransfers: (val) => set({ transfers: val}),

  clearAssetDetails: () => set({ 
    assetDetails: null,
    accessories: [],
    errors: [],
    comments: [],
    transfers: []
  })
}))