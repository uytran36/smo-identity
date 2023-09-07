import LocalAuthService from '@api/auth/local/local.service.ts'
import { LocalCreateUserDto } from '@api/user/dto/create-user.dto.ts'
import { GetListUserQuery } from '@api/user/dto/list-user.dto.ts'
import { User, UserSchema } from '@db/models/user.model.ts'
import Logger from '@logger'
import { Context } from 'oak/mod.ts'

export default class UserService {
   static async createOne(
      input: LocalCreateUserDto,
      ctx: Context
   ): Promise<string | undefined> {
      const { hashed, salt } = await LocalAuthService.hashPassword(
         input.password
      )
      try {
         const newUser = await User.insertOne({
            ...input,
            createdAt: new Date(),
            updatedAt: new Date(),
            isMaster: false,
            isActive: false,
            name: input.email.split('@')[0],
            provider: 'NONE',
            password: hashed,
            salt,
         })
         ctx.state.message = 'created user successfully'
         ctx.response.body = newUser
         return newUser
      } catch (err) {
         Logger.error(err)
         ctx.response.status = 400
         ctx.state.message = 'cannot create user'
         return undefined
      }
   }

   static getOneByEmail(email: string): Promise<UserSchema | undefined> {
      return User.findOne({ email, provider: 'NONE' })
   }

   static async getListUsers(
      query: GetListUserQuery,
      ctx: Context
   ): Promise<UserSchema[] | undefined> {
      try {
         const cursor = User.find()
         cursor.skip(query.page * query.offset).limit(query.offset)
         ctx.state.message = 'get list user successfully'
         ctx.response.body = await cursor.toArray()
         return await cursor.toArray()
      } catch (err) {
         ctx.response.status = 500
         ctx.state.message = err
         return
      }
   }
}
