import type { AssetDetails, Comment, Error, Part, Transfer } from '@/api/asset'
import { create } from 'zustand'

interface AssetStore {
  //entities
  assetDetails: AssetDetails | null
  accessories: string[]
  errors: Error[]
  comments: Comment[]
  transfers: Transfer[]
  parts: Part[]

  //actions
  setAssetDetails: (assetDetails: AssetDetails) => void
  setAssetAccessories: (accessories: string[]) => void
  setAssetErrors: (errors: Error[]) => void
  setAssetComments: (comments: Comment[]) => void
  setAssetTransfers: (transfers: Transfer[]) => void
  setAssetParts: (parts: Part[]) => void

  //clear state
  clearAssetDetails: () => void
}

export const useAssetStore = create<AssetStore>((set) => ({
  assetDetails: null,
  accessories: [],
  errors: [],
  comments: [],
  transfers: [],
  parts: [],

  setAssetDetails: (assetDetails) => set({ assetDetails }),
  setAssetAccessories: (accessories) => set({ accessories }),
  setAssetErrors: (errors) => set({ errors }),
  setAssetComments: (comments) => set({ comments }),
  setAssetTransfers: (transfers) => set({ transfers }),
  setAssetParts: (parts) => set({ parts }),

  clearAssetDetails: () => set({
    assetDetails: null,
    accessories: [],
    errors: [],
    comments: [],
    transfers: [],
    parts: []
  })
}))