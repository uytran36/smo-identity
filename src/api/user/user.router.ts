import { Router } from 'oak/router.ts'
import UserController from '@api/user/user.controller.ts'

const userRouter = new Router()

// userRouter.post('/get-list-users', UserController.getListUsers())
export default userRouter

userRouter.get('/list-users', UserController.getListUsers)
