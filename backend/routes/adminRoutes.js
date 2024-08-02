import express from 'express'
const adminRouter = express.Router();
import { protect } from '../middleware/adminAuthMiddleware.js';
import { authAdmin, blockUnblockUser, deleteUser, getUsers, logoutAdmin, updateUserProfile } from '../controllers/adminController.js'  


adminRouter.post('/auth', authAdmin);
adminRouter.post('/logout', logoutAdmin);
adminRouter.get('/users', protect, getUsers);
adminRouter.delete('/users/delete', protect, deleteUser);
adminRouter.patch('/users/unblock-block', protect, blockUnblockUser); 
adminRouter.put('/users/update-user', updateUserProfile);


export default adminRouter