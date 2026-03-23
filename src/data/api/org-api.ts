import { api } from '@/data/api/axios-client'
import { z } from 'zod'
import { type OrgSummary, OrgSummarySchema } from '../../types/organization-types'

export async function getOrgs(): Promise<OrgSummary[]> {
  const res = await api.get('/organizations')
  return z.array(OrgSummarySchema).parse(res.data)
}