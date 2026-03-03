import type { Organization } from '@/data/api/org-api'
import { create } from 'zustand'

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