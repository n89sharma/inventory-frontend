import { z } from 'zod';

export const ArrivalSchema = z.object({
  arrival_number: z.string(),
  vendor: z.string(),
  destination_code: z.string(),
  destination_street: z.string(),
  transporter: z.string(),
  created_at: z.iso.datetime(),
  created_by: z.string().nullable()
})

export type Arrival = z.infer<typeof ArrivalSchema>

