import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.ts"
import { Role } from "../generated/prisma/enums.ts";

const saltRounds = 10;

const createUser = async (arg: {username: string, password: string, role?: Role})=>{
  const { username, password, role } = arg;
  const hashedpassword = await bcrypt.hash(password, saltRounds);
  const data = role
    ? {
        username: username,
        password: hashedpassword,
        role: role,
      }
    : {
        username: username,
        password: hashedpassword,
      };
  const user = prisma.user.create({
    data: data,
  });
  return user;
}

const deleteUser = (arg: {id: string})=>{
    prisma.user.delete({
        where: {
            id: arg.id
        }
    })
    return {message: "user deleted"};
}


export default {
    createUser: createUser,
    deleteUser: deleteUser
}