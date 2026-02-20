import { Router } from "express";
import queueController from "../controllers/queueController";
import { createQueueSchemaValidator } from "../validators/user/createQueueSchemaValidator";
import validate from "../middlewares/validateMiddleware";
import { updateQueueSchemaValidator } from "../validators/user/updateQueueSchemaValidator";

const queueRouter = Router();

queueRouter.post("/create",validate(createQueueSchemaValidator),queueController.createQueue);
queueRouter.post("/update", validate(updateQueueSchemaValidator), queueController.updateQueue);
queueRouter.get("/getall", queueController.getQueues);


export default queueRouter;