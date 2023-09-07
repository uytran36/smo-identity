import { z } from 'zod'

export const localCreateUserDto = z.object({
   email: z.string().email().max(80),
   password: z.string().max(80),
})

export type LocalCreateUserDto = z.infer<typeof localCreateUserDto>
