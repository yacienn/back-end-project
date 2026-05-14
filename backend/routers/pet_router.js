import express from 'express';
import { addPets } from '../controllers/pets_controller.js';


const router = express.Router();
router.post('/add_pet', addPets);

export default router;
