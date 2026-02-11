import express from 'express';
import { authenticateJWT } from '../middlewares/authentificationMiddleware.ts';
import validate from '../middlewares/validateMiddleware.ts';
import { loginUserSchemaValidator } from '../validators/user/loginUserSchemaValidator.ts';
import authentificationController from '../controllers/authentificationController.ts';
const authRouter = express.Router();

authRouter.get("/whoami", authenticateJWT, authentificationController.whoami)
authRouter.post("/login", validate(loginUserSchemaValidator), authentificationController.login);

export default authRouter;