import { zProvider } from '@common/enum.ts'
import { z } from 'zod'

export type ApiResponse = {
   status: number
   message: string
   data?: unknown
   error?: Error
}

export type ProviderEnum = z.infer<typeof zProvider>
