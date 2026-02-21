import { Router } from "express";
import analyticController from "../controllers/analyticController";

const analyticRouter = Router();

analyticRouter.post("/getall", analyticController.getAnalytics);

export default analyticRouter;
