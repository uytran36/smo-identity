import { Router } from 'oak/router.ts'
import LocalAuthController from '@api/auth/local/local.controller.ts'

const localAuthRouter = new Router()

localAuthRouter.post('/register', LocalAuthController.register)
localAuthRouter.post('/login', LocalAuthController.login)

export default localAuthRouter

