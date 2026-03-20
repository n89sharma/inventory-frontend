import { z } from 'zod';

export const OrgSchema = z.object({
  id: z.number(),
  account_number: z.string(),
  name: z.string()
});

export type Organization = z.infer<typeof OrgSchema>;
