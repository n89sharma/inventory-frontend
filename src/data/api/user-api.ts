import { api } from '@/data/api/axios-client'
import { z } from 'zod'

const UserSchema = z.object({
  id: z.int(),
  username: z.string(),
  name: z.string(),
  email: z.string(),
  role_id: z.int(),
  role: z.string()
})

export type User = z.infer<typeof UserSchema>

export async function getUsers(): Promise<User[]> {
  const res = await api.get('/users', { params: { filterActive: true } })
  return z.array(UserSchema).parse(res.data)
}
