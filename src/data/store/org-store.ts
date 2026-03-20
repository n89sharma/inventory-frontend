import { create } from 'zustand'
import type { Organization } from '../../types/organization-types'

interface OrgStore {
  organizations: Organization[]
  loading: boolean

  setOrganizations: (organizations: Organization[]) => void
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