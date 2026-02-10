import { PrismaClient } from "../generated/prisma/client.ts";
import type { PrismaClientOptions, Subset } from "../generated/prisma/internal/prismaNamespace.ts";

const prisma = new PrismaClient({} as Subset<PrismaClientOptions, PrismaClientOptions>)

export default prisma;