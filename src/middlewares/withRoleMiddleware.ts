import type { NextFunction, Request, Response } from "express";
import type { Role } from "../generated/prisma/enums.ts";

const withRole = (role: Role) => (req:Request, res: Response, next: NextFunction)=>{
    const payload = req.payload;
    if(!payload){
        return res.status(500).json({message: "authentification failed"});
    }
    const user = payload.user;
    if(user.role === role){
        next();
    }else{
        return res.status(403).json({message: "this user is not authorized to access this ressource"});
    }
}

export default withRole;