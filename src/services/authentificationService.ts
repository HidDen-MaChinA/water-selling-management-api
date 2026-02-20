import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import prisma from "../lib/prisma"
import { error } from "console";
import type { Role } from "../generated/prisma/enums";
import type { User } from '../generated/prisma/browser';


const secretKey = process.env.JWT_SECRET_KEY;

const login = (arg: { username: string; password: string }) : Promise<string> => {
  const { username, password } = arg;
  if(!secretKey){
    throw error("login impossible JWT not configured properly");
  }
  return prisma.user
    .findUniqueOrThrow({
      where: {
        username: username,
      },
    })
    .then(async (user) => {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const toReturn = {
          id: user.id,
          username: user.username,
          role: user.role,
        };
        return toReturn;
      } else {
        throw error("password incorrect");
      }
    })
    .then((jwtPayload: { username: string; role: Role; id: string }) => {
      const token = jwt.sign(jwtPayload, secretKey, {
        expiresIn: "8h",
      });
      return token;
    });
};

const whoami = (arg: {id: string, username: string, role: Role}) : Promise<{username: string, role: Role, id:string}> =>{
  return new Promise((res, rej)=>{
    res(arg);
  }) 
}

export default {
    login: login,
    whoami: whoami
}