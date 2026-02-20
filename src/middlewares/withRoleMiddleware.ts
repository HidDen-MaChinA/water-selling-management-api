import type { NextFunction, Request, Response } from "express";
import { Role } from "../generated/prisma/enums";

const withRole = (role: Role) => (req:Request, res: Response, next: NextFunction)=>{
    const payload = req.payload;
    if(!payload){
        return res.status(500).send({message: "authentification failed"});
    }
    const user = payload.user;
    if(user.role === role || user.role === Role.ADMIN){
        next();
    }else{
        return res.status(403).send({message: "this user is not authorized to access this ressource"});
    }
}

export default withRole;