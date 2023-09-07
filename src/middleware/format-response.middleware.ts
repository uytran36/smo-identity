import { Context, Next } from 'oak/mod.ts'
import { ERROR_CODE } from '@common/enum.ts'
import { ApiResponse } from '@common/type.ts'

async function formatResponse(ctx: Context, next: Next) {
   try {
      await next()
      const ctxStatus: number = ctx.response.status
      const mappedErrorValues = Object.values(ERROR_CODE).filter(
         (v) => !isNaN(Number(v))
      )
      const mappedErrorKeys = Object.values(ERROR_CODE).filter((v) =>
         isNaN(Number(v))
      )
      if (mappedErrorValues.includes(ctxStatus)) {
         const index = mappedErrorValues.indexOf(ctxStatus)
         throw {
            status: ctxStatus,
            message: ctx.state.message ?? mappedErrorKeys[index],
         }
      }
      const response: ApiResponse = {
         status: ctx.response.status,
         message: ctx.state.message,
         data: ctx.response.body,
      }

      ctx.response.body = response
   } catch (err) {
      ctx.response.status = 500

      const response: ApiResponse = {
         status: err.status,
         message: err.message ?? 'Internal server error',
         error: err.message,
      }

      ctx.response.body = response
   }
}

export default formatResponse
