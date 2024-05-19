import express from 'express'
import verifyToken from '../middlewares/verifyToken'
import * as userController from '../controllers/user'

const router = express.Router()

router.use(verifyToken)
router.get('/get-current', userController.getCurrent)
router.get('/get/:userId', userController.getUser)
router.put('/update-user/:userId', userController.updateUser)
router.delete('/delete-user/:userId', userController.deleteUser)
router.get('/get-all', userController.getAllUsers);


export default router