import { Context, Next } from 'oak/mod.ts'
import Logger from '@logger'

async function benchmarkRequest(ctx: Context, next: Next): Promise<void> {
   const start = Date.now()
   await next()
   const rt = Date.now() - start
   const { method, url } = ctx.request
   const { status } = ctx.response

   Logger.info(
      `${status} [${method}] ${url} - ${start.toString()} (${rt}ms)`,
   )
}

export default benchmarkRequest
