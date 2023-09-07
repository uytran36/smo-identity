import { Context } from 'oak/context.ts'
import { localCreateUserDto } from '@api/user/dto/create-user.dto.ts'
import UserService from '@api/user/user.service.ts'
import LocalAuthService from '@api/auth/local/local.service.ts'

export default class LocalAuthController {
   static async register(ctx: Context) {
      const body = await ctx.request.body().value
      const createUserInput = localCreateUserDto.parse(body)
      return await UserService.createOne(createUserInput, ctx)
   }

   static async login(ctx: Context) {
      const body = await ctx.request.body().value
      const loginInput = localCreateUserDto.parse(body)
      return await LocalAuthService.login(loginInput, ctx)
   }
   static me(ctx: Context) {
      return ctx.state.user
   }
}
