import prisma from "../../../lib/prisma";

export async function getChunkNumber(arg: number) {
    return await prisma.customerAnalyticData.count();
}