import { UserSchema } from '@db/models/user.model.ts'
import { Token, TokenPayload } from '@api/auth/entity/token.entity.ts'
import Config from '@config/env.config.ts'
import { SignJWT } from 'jose'

export default class AuthService {
   private static async genToken(
      payload: TokenPayload,
      isAT = true,
   ): Promise<string> {
      const { ALG, SECRET, AT_EXP, RT_EXP } = Config.JWT
      const secret = new TextEncoder().encode(SECRET)

      const token = await new SignJWT({ ...payload, isAT })
         .setProtectedHeader({ alg: ALG })
         .setIssuedAt()
         .setExpirationTime(isAT ? AT_EXP : RT_EXP)
         .sign(secret)

      return token
   }

   static async genTokenPair(
      user: UserSchema,
   ): Promise<Token> {
      const payload = {
         _id: user._id,
         name: user.name,
         isActive: user.isActive,
         isMaster: user.isMaster,
      }

      const [accessToken, refreshToken] = await Promise.all([
         AuthService.genToken(payload),
         AuthService.genToken(payload, false),
      ])

      return { accessToken, refreshToken }
   }

   static async verifyToken(
      token: string,
   ): Promise<{ isValid: boolean; payload: TokenPayload }> {
      return { isValid: true, payload: { _id: 'sample uuid' } }
   }
}
