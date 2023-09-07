import { Router } from 'oak/mod.ts'
import localAuthRouter from '@api/auth/local/local.router.ts'

const authRouter = new Router({ prefix: '/auth' })

authRouter.use('/local', localAuthRouter.routes())

export default authRouter
