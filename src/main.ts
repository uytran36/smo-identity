import { Application } from 'oak/mod.ts'

import Config from '@config/env.config.ts'
import authRouter from '@api/auth/auth.router.ts'
import Logger from '@logger'
import '@db/db.connector.ts'
import benchmarkRequest from '@middleware/benchmark.middleware.ts'
import authRequest from '@middleware/auth.middleware.ts'
import formatResponse from '@middleware/format-response.middleware.ts'
import userRouter from "@api/user/user.router.ts"
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts"

const app = new Application()
const { PORT, NAME } = Config.SERVER

app.use(oakCors());
app.use(benchmarkRequest)
app.use(authRequest)
app.use(formatResponse)
app.use(authRouter.routes())

app.use(authRouter.routes())
app.use(userRouter.routes())

Logger.info(`[${NAME}] is listening on port ${PORT}`)
await app.listen({ port: PORT }).catch(Logger.error)
