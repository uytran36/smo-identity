import AuthService from '@api/auth/auth.service.ts'
import { LocalCreateUserDto } from '@api/user/dto/create-user.dto.ts'
import UserService from '@api/user/user.service.ts'
import { genSalt, hash } from 'bcrypt'
import { Context } from 'oak/mod.ts'

//todo
type LoginResponse = {
   accessToken: string
   refreshToken: string
}

export default class LocalAuthService {
   static async hashPassword(
      rawPassword: string
   ): Promise<{ salt: string; hashed: string }> {
      const salt = await genSalt(8)
      const hashed = await hash(rawPassword, salt)
      return { salt, hashed }
   }

   static async isPasswordMatched(
      rawPassword: string,
      salt: string,
      dbHash: string
   ): Promise<boolean> {
      const hashed = await hash(rawPassword, salt)
      return hashed === dbHash
   }

   static async login(
      loginInput: LocalCreateUserDto,
      ctx: Context
   ): Promise<LoginResponse | undefined> {
      const { email, password } = loginInput

      const user = await UserService.getOneByEmail(email)

      if (!user || !user.salt) {
         ctx.response.status = 404
         ctx.state.message = 'user not found'
         return
      }

      const storedHash = user.password || ''

      const isLoginSuccess = await LocalAuthService.isPasswordMatched(
         password,
         user.salt,
         storedHash
      )

      if (!isLoginSuccess) {
         ctx.response.status = 400
         ctx.state.message = 'wrong email/password'
         return
      }

      const { accessToken, refreshToken } = await AuthService.genTokenPair(user)

      return (ctx.response.body = {
         accessToken,
         refreshToken,
      })
   }
}
