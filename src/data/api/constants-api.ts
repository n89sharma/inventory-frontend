import { api } from '@/data/api/axios-client'
import { z } from 'zod'

const ConstantsSchema = z.object({
  coreFunctions: z.array(z.object({ id: z.number(), accessory: z.string() })),
  assetTypes: z.array(z.object({ id: z.number(), asset_type: z.string() })),
  trackingStatuses: z.array(z.object({ id: z.number(), status: z.string() })),
  availabilityStatuses: z.array(z.object({ id: z.number(), status: z.string() })),
  technicalStatuses: z.array(z.object({ id: z.number(), status: z.string() })),
  roles: z.array(z.object({ id: z.number(), role: z.string() })),
  invoiceTypes: z.array(z.object({ id: z.number(), type: z.string() })),
  warehouses: z.array(z.object({ id: z.number(), city_code: z.string(), street: z.string(), is_active: z.boolean() }))
})

export type Constants = z.infer<typeof ConstantsSchema>

export async function getConstants(): Promise<Constants> {
  const res = await api.get('/constants')
  return ConstantsSchema.parse(res.data)
}