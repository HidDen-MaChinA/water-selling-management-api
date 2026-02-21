import type { RequestHandler } from "express";
import { verifiyPageNumber } from "./utils/verifyPageNumber";
import analyticService from "../services/analyticService";

const getAnalytics : RequestHandler = (req, res)=>{
    const page = verifiyPageNumber(req.query.page as string | undefined);
    analyticService.getAnalytics(page).then((analytics)=>{
        res.status(200).json(analytics);
    })

}

export default {
    getAnalytics
}
