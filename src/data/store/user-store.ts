import { create } from 'zustand'
import type { User } from '@/data/api/user-api'

interface UserStore {
  users: User[]
  setUsers: (users: User[]) => void
}

export const useUserStore = create<UserStore>(set => ({
  users: [],
  setUsers: users => set({ users })
}))
