import { api } from '@/data/api/axios-client'
import { z } from 'zod'

const ModelSchema = z.object({
  brand_name: z.string(),
  model_name: z.string(),
  asset_type: z.string(),
  weight: z.number(),
  size: z.number()
})

export type Model = z.infer<typeof ModelSchema>

export async function getModels(): Promise<Model[]> {
  const res = await api.get('/models')
  return z.array(ModelSchema).parse(res.data)
}