import UserService from '@api/user/user.service.ts'
import { getQuery } from 'oak/helpers.ts'
import { Context } from 'oak/context.ts'

export default class UserController {
   static async getListUsers(ctx: Context) {
      const {page, offset, searchText} = getQuery(ctx, { mergeParams: true })
      const query = {
         page: Number(page),
         offset: Number(offset),
         searchText
      }
      return await UserService.getListUsers(query, ctx)
   }
}
