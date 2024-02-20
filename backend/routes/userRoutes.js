import express from 'express'
const router = express.Router();
import { authUser, getUser, logoutUser, registerUser, updateUser } from '../controller/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/', registerUser)
router.post('/auth', authUser)
router.post('/logout', logoutUser)
router.route('/profile').get(protect, getUser).put(protect,updateUser)

export default router;