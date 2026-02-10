import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.ts"
import { error } from "console";
import type { Role } from "../generated/prisma/enums.ts";


const secretKey = process.env.JWT_SECRET_KEY;

const login = (arg: { username: string; password: string }) : Promise<string> => {
  const { username, password } = arg;
  if(!secretKey){
    throw error("login impossible JWT not configured properly");
  }
  return prisma.user
    .findUnique({
      where: {
        username: username,
      },
    })
    .then(async (user) => {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const toReturn = {
          username: user.username,
          role: user.role,
        };
        return toReturn;
      } else {
        throw error("password incorrect");
      }
    }).then((jwtPayload: {username: string, role: Role})=>{
        const token = jwt.sign(
            jwtPayload,
            secretKey,
            {
                expiresIn: '8h'
            }
        )
        return token;
    });
};

export default {
    login: login
}