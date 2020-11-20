import { Router} from 'express'

const router = Router()
import UserController from './controllers/UserController'
//userController
router.post('/users', UserController.create)
router.get('/users', UserController.list)
router.get('/users/:name', UserController.listOne)
router.delete('/users/:id', UserController.delete)


export default router;