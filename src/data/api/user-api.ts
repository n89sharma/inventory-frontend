import { api } from '@/data/api/axios-client'
import { z } from 'zod'

const UserSchema = z.object({
  username: z.string(),
  firstname: z.string(),
  lastname: z.string(),
  active: z.boolean()
})

export type User = z.infer<typeof UserSchema>

export async function getUsers(): Promise<User[]> {
  const res = await api.get('/users')
  return z.array(UserSchema).parse(res.data)
}
