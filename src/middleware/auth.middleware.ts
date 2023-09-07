import { Context, Next } from 'oak/mod.ts'
import AuthService from '@api/auth/auth.service.ts'
import Config from '@config/env.config.ts'

async function authRequest(ctx: Context, next: Next): Promise<unknown> {
   const { SERVER } = Config
   const pathname = ctx.request.url.pathname

   if (SERVER.PUBLIC_PATHS.includes(pathname)) {
      return next()
   }

   const { headers } = ctx.request
   const accessToken = headers.get('authorization')

   if (!accessToken) {
      throw new Error('authorization request headers')
   }

   const { isValid, payload } = await AuthService.verifyToken(accessToken)

   if (!isValid) {
      throw new Error('invalid token')
   }

   ctx.state.user = payload
   return next()
}

export default authRequest
