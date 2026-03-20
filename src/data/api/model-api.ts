import { api } from '@/data/api/axios-client'
import { z } from 'zod'
import { type Model, ModelSchema } from '../../types/model-types'

export async function getModels(): Promise<Model[]> {
  const res = await api.get('/models')
  return z.array(ModelSchema).parse(res.data)
}