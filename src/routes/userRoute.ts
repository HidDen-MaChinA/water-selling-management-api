import express, { type Application } from 'express';
import userController from '../controllers/userController.ts';
import { authenticateJWT } from '../middlewares/authentificationMiddleware.ts';
import validate from '../middlewares/validateMiddleware.ts';
import { createUserSchemaValidator } from '../validators/user/createUserSchemaValidator.ts';
import withRole from '../middlewares/withRoleMiddleware.ts';

const userRouter = express.Router();

userRouter.post(
  "/create",
  validate(createUserSchemaValidator),
  authenticateJWT,
  withRole("ADMIN"),
  userController.createUser
);

export default userRouter;
