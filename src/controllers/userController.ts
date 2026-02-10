import type { RequestHandler } from "express"
import userService from "../services/userService.ts";

const createUser : RequestHandler = (req, res, next)=>{
    const requestBody = req.body;
    if(!requestBody){
        return res.status(500).json({message: "no payload provided"})
    }else{
        const user = requestBody;
        return userService.createUser(user).then((createdUser)=>{
         res.json(createUser)
        })
    }
}

export default {
    createUser: createUser
}