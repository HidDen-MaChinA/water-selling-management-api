import type { NextFunction, Request, Response } from 'express';
import yup from 'yup';

const validate = (schema: yup.ObjectSchema<{[arg: string]: any}>) => (req: Request, res:Response, next:NextFunction)=> {
        schema.validate(req.body, {abortEarly: false}).then(()=>{
            next()
        }).catch((err)=>{
            res.status(400).json({message: err.errors})
        });
}

export default validate;