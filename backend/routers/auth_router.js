import express from 'express';
import { signUp, logIn, getUsers } from '../controllers/auth_controller.js';
import { authenticateToken } from '../middleware/auth_middleware.js';

const router = express.Router();

router.post('/sing_up', signUp);
router.post('/log_in', logIn);
router.get('/regester', authenticateToken, getUsers);  

export default router;
