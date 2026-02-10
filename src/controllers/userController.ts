import type { RequestHandler } from "express"

const createUser : RequestHandler = (req, res, next)=>{
    return res.json({
        test: "test"
    });
}


export default {
    createUser: createUser
}