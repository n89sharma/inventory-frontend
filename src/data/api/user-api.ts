import { api } from '@/data/api/axios-client'
import { z } from 'zod'
import { type User, UserSchema } from '../../types/user-types'

export async function getUsers(): Promise<User[]> {
  const res = await api.get('/users', { params: { filterActive: true } })
  return z.array(UserSchema).parse(res.data)
}
