import express from 'express';
import { authenticateJWT } from '../middlewares/authentificationMiddleware';
import validate from '../middlewares/validateMiddleware';
import { loginUserSchemaValidator } from '../validators/user/loginUserSchemaValidator';
import authentificationController from '../controllers/authentificationController';
const authRouter = express.Router();

authRouter.get("/whoami", authenticateJWT, authentificationController.whoami)
authRouter.post("/login", validate(loginUserSchemaValidator), authentificationController.login);

export default authRouter;