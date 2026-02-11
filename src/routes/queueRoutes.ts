import { Router } from "express";
import queueController from "../controllers/queueController.ts";

const queueRouter = Router();

queueRouter.post("/create",queueController.createQueue);
queueRouter.post("/update", queueController.updateQueue);
queueRouter.get("/getone", queueController.getQueue);
queueRouter.get("/getall", queueController.getQueues);


export default queueRouter;