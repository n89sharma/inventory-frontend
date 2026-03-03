import { api } from '@/data/api/axios-client'
import { z } from 'zod'

const OrgSchema = z.object({
  id: z.number(),
  account_number: z.string(),
  name: z.string()
})

export type Organization = z.infer<typeof OrgSchema>

export async function getOrgs(): Promise<Organization[]> {
  const res = await api.get('/organizations')
  return z.array(OrgSchema).parse(res.data)
}