import express, { type Application } from 'express';
import userController from '../controllers/userController.ts';
import { authenticateJWT } from '../middlewares/authentificationMiddleware.ts';

const router = express.Router();



router.post('/create', userController.createUser)

export default router;
