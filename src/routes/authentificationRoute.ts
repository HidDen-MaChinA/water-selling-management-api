import express from 'express';
import { authenticateJWT } from '../middlewares/authentificationMiddleware.ts';
import validate from '../middlewares/validateMiddleware.ts';
import { loginUserSchemaValidator } from '../validators/user/loginUserSchemaValidator.ts';
import authentificationController from '../controllers/authentificationController.ts';
const authRoutes = express.Router();

authRoutes.get("/whoami", authenticateJWT, authentificationController.whoami)
authRoutes.post("/login", validate(loginUserSchemaValidator), authentificationController.login);

export default authRoutes;