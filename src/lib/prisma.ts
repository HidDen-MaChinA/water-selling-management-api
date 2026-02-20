import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import type { PrismaClientOptions, Subset } from "../generated/prisma/internal/prismaNamespace";
import { error } from "console";
import "dotenv/config"

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