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
                maxAge:  168,
                sameSite: 'strict'
            }).status(200).json({message: "login successfuly"});
        });
    }
}



export default {
    login: login
}