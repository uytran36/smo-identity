import { UserSchema } from '@db/models/user.model.ts'

export type Token = {
   accessToken: string
   refreshToken: string
}

export type TokenPayload = Partial<UserSchema> | { isAT: boolean }
