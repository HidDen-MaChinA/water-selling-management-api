import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";
import type { PrismaClientOptions, Subset } from "../generated/prisma/internal/prismaNamespace.ts";
import { error } from "console";


const connectionString = process.env.DATABASE_URL;

console.log(connectionString);

if(!connectionString){
    throw error("DATABASE_URL env not defined");
}
const adapter = new PrismaPg({connectionString})

const prisma = new PrismaClient({
    adapter: adapter
} as Subset<PrismaClientOptions, PrismaClientOptions>)

export default prisma;