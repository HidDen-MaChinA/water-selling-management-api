import express, { type Application } from 'express';
import userController from '../controllers/userController';
import { authenticateJWT } from '../middlewares/authentificationMiddleware';
import validate from '../middlewares/validateMiddleware';
import { createUserSchemaValidator } from '../validators/user/createUserSchemaValidator';
import withRole from '../middlewares/withRoleMiddleware';

const userRouter = express.Router();

userRouter.post(
  "/create",
  validate(createUserSchemaValidator),
  // authenticateJWT,
  // withRole("ADMIN"),
  userController.createUser
);

export default userRouter;
