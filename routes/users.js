import { Router } from 'express'
const router = Router()
import { getUsers, getUser, createUser, updateUser, deleteUser, login, deleteAllUsers } from '../controllers/users'
import { verifyToken } from '../utils/auth'

router.get('/',verifyToken, getUsers)
router.get('/:id', verifyToken, getUser)
router.post('/', verifyToken, createUser)
router.put('/:id', verifyToken, updateUser)
router.delete('/:id',verifyToken, deleteUser)
router.delete('/', verifyToken, deleteAllUsers)
router.post('/login', login)

export default router