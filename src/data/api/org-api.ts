import { api } from '@/data/api/axios-client'
import { z } from 'zod'
import { type Organization, OrgSchema } from '../../types/organization-types'

export async function getOrgs(): Promise<Organization[]> {
  const res = await api.get('/organizations')
  return z.array(OrgSchema).parse(res.data)
}