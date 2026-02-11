import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import type { Role } from '../generated/prisma/enums.ts';


const jwtSecretKey = process.env.JWT_SECRET_KEY;

export const authenticateJWT:RequestHandler = (req, res, next) => {
  const authHeader = req.cookies as {sessionToken: string};
  const cookieToken = authHeader.sessionToken;
  if (!authHeader) {
    return res.status(403).json({ message: 'Authorization token required' });
  }
  if(!cookieToken){
    return res.status(403).json({message: 'Authorization token not provided'});
  }
  if(!jwtSecretKey){
    return res.status(500).json({message: 'Jwt secret key not set, authentification will not be usable'})
  }

  jwt.verify(cookieToken, jwtSecretKey, (err:any, user:any) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    req.payload = {
        user: user
    };
    next();
  });
};