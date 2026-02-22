import type { AssetDetails, AssetSummary, Comment, Error, Part, Transfer } from '@/api/asset'
import { create } from 'zustand'

interface AssetStore {
  //entities
  assets: AssetSummary[]
  assetDetails: AssetDetails | null
  accessories: string[]
  errors: Error[]
  comments: Comment[]
  transfers: Transfer[]
  parts: Part[]

  //actions
  setAssets:(assets: AssetSummary[]) => void
  setAssetDetails: (assetDetails: AssetDetails) => void
  setAssetAccessories: (accessories: string[]) => void
  setAssetErrors: (errors: Error[]) => void
  setAssetComments: (comments: Comment[]) => void
  setAssetTransfers: (transfers: Transfer[]) => void
  setAssetParts: (parts: Part[]) => void

  //clear state
  clearAssetStore: () => void
}

export const useAssetStore = create<AssetStore>((set) => ({
  assets: [],
  assetDetails: null,
  accessories: [],
  errors: [],
  comments: [],
  transfers: [],
  parts: [],

  setAssets: (assets) => set({ assets }),
  setAssetDetails: (assetDetails) => set({ assetDetails }),
  setAssetAccessories: (accessories) => set({ accessories }),
  setAssetErrors: (errors) => set({ errors }),
  setAssetComments: (comments) => set({ comments }),
  setAssetTransfers: (transfers) => set({ transfers }),
  setAssetParts: (parts) => set({ parts }),

  clearAssetStore: () => set({
    assetDetails: null,
    accessories: [],
    errors: [],
    comments: [],
    transfers: [],
    parts: []
  })
}))