import type { RequestHandler } from "express";
import authentificationService from "../services/authentificationService.ts";

const login: RequestHandler = (req, res)=>{
    const requestBody = req.body;
    if(!requestBody){
        return res.status(500).json({message: "no payload provided"})
    }else{
        const loginDetails = requestBody;
        return authentificationService.login(loginDetails).then((token)=>{
            res.cookie('sessionToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "prod",
                sameSite: process.env.NODE_ENV === "prod" && "none"
            }).status(200).json({message: "login successfuly"});
        });
    }
}

const whoami : RequestHandler = (req, res)=>{
   const payload = req.payload 
   const user = payload?.user
   authentificationService.whoami(user).then((user)=>{
    res.status(200).json(user);
   });
}



export default {
    login: login,
    whoami: whoami
}