import { create } from 'zustand'

export type NavSection = 'arrivals' | 'transfers' | 'departures' | 'holds' | 'invoices'

interface NavigationStore {
  lastPaths: Record<NavSection, string | null>
  setLastPath: (section: NavSection, path: string) => void
  clearLastPath: (section: NavSection) => void
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  lastPaths: { arrivals: null, transfers: null, departures: null, holds: null, invoices: null },
  setLastPath: (section, path) =>
    set(state => ({ lastPaths: { ...state.lastPaths, [section]: path } })),
  clearLastPath: (section) =>
    set(state => ({ lastPaths: { ...state.lastPaths, [section]: null } }))
}))
