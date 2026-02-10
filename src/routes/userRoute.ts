import express, { type Application } from 'express';
import userController from '../controllers/userController.ts';
import { authenticateJWT } from '../middlewares/authentificationMiddleware.ts';
import validate from '../middlewares/validateMiddleware.ts';
import { createUserSchemaValidator } from '../validators/user/createUserSchemaValidator.ts';

const router = express.Router();



router.post('/create',authenticateJWT, validate(createUserSchemaValidator), userController.createUser)

export default router;
