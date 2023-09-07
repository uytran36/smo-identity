
import { z } from 'zod'

export const getListUserQuery = z.object({
   page: z.number(),
   offset: z.number(),
   searchText: z.string().max(80).optional()
})

export type GetListUserQuery = z.infer<typeof getListUserQuery>
