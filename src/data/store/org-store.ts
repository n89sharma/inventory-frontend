import { create } from 'zustand'
import type { OrgSummary } from '../../types/organization-types'

interface OrgStore {
  organizations: OrgSummary[]
  loading: boolean

  setOrganizations: (organizations: OrgSummary[]) => void
  setLoading: (loading: boolean) => void

  clearOrganizations: () => void
}

export const useOrgStore = create<OrgStore>((set) => ({
  organizations: [],
  loading: false,

  setOrganizations: (organizations) => set({ organizations }),
  setLoading: (loading) => set({ loading }),
  clearOrganizations: () => set({ organizations: [] })
}))