import express from 'express';
import { signUp, logIn, getUsers } from '../controllers/auth_controller.js';

const router = express.Router();

router.post('/sing_up', signUp);
router.post('/log_in', logIn);
router.get('/users', getUsers);



export default router;
