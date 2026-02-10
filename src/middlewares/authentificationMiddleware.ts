import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import type { Role } from '../generated/prisma/enums.ts';


const jwtSecretKey = process.env.JWT_SECRET_KEY;

export const authenticateJWT:RequestHandler = (req, res, next) => {
  const authHeader = req.cookies.sessionToken;

  if (!authHeader) {
    return res.status(403).json({ message: 'Authorization token required' });
  }
  const token = authHeader.split(' ')[1];
  if(!token){
    return res.status(403).json({message: 'Authorization token not provided'});
  }
  if(!jwtSecretKey){
    return res.status(500).json({message: 'Jwt secret key not set, authentification will not be usable'})
  }

  jwt.verify(token, jwtSecretKey, (err:any, user:any) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    req.payload = {
        user: user
    };
    next();
  });
};