import type { Constants } from '@/data/api/constants-api'
import { create } from 'zustand'

interface Status {
  id: number
  status: string
}

interface Accessory {
  id: number
  accessory: string
}

interface AssetType {
  id: number
  asset_type: string
}

interface Role {
  id: number
  role: string
}

interface InvoiceType {
  id: number
  type: string
}

interface Warehouse {
  id: number
  city_code: string
  street: string
}

interface ConstantsStore {
  coreFunctions: Accessory[]
  assetTypes: AssetType[]
  trackingStatuses: Status[]
  availabilityStatuses: Status[]
  technicalStatuses: Status[]
  roles: Role[]
  invoiceTypes: InvoiceType[]
  warehouses: Warehouse[]
  loading: boolean

  setConstants: (constants: Constants) => void
  setLoading: (loading: boolean) => void

  clearConstants: () => void
}

export const useConstantsStore = create<ConstantsStore>((set) => ({
  coreFunctions: [],
  assetTypes: [],
  trackingStatuses: [],
  availabilityStatuses: [],
  technicalStatuses: [],
  roles: [],
  invoiceTypes: [],
  warehouses: [],
  loading: false,

  setConstants: (constants) => set({
    coreFunctions: constants.coreFunctions,
    assetTypes: constants.assetTypes,
    trackingStatuses: [{ id: 0, status: 'Any' }, ...constants.trackingStatuses],
    availabilityStatuses: [{ id: 0, status: 'Any' }, ...constants.availabilityStatuses],
    technicalStatuses: [{ id: 0, status: 'Any' }, ...constants.technicalStatuses],
    roles: constants.roles,
    invoiceTypes: constants.invoiceTypes,
    warehouses: [{ id: 0, city_code: 'Any', street: '' }, ...constants.warehouses]
  }),
  setLoading: (loading) => set({ loading }),
  clearConstants: () => set({
    coreFunctions: [],
    assetTypes: [],
    trackingStatuses: [],
    availabilityStatuses: [],
    technicalStatuses: [],
    roles: [],
    invoiceTypes: [],
    warehouses: []
  })
}))