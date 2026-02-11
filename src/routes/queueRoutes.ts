import { Router } from "express";
import queueController from "../controllers/queueController.ts";
import { createQueueSchemaValidator } from "../validators/user/createQueueSchemaValidator.ts";
import validate from "../middlewares/validateMiddleware.ts";
import { updateQueueSchemaValidator } from "../validators/user/updateQueueSchemaValidator.ts";

const queueRouter = Router();

queueRouter.post("/create",validate(createQueueSchemaValidator),queueController.createQueue);
queueRouter.post("/update", validate(updateQueueSchemaValidator), queueController.updateQueue);
queueRouter.get("/getall", queueController.getQueues);


export default queueRouter;