import { api } from '@/data/api/axios-client'
import { type ReferenceData, ReferenceDataSchema } from '../../types/reference-data-types'

export async function getReferenceData(): Promise<ReferenceData> {
  const res = await api.get('/constants')
  return ReferenceDataSchema.parse(res.data)
}