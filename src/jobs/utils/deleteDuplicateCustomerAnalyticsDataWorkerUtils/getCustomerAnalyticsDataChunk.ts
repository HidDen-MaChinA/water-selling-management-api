import prisma from "../../../lib/prisma";

export async function getCustomerAnalyticsDataChunk(args: {chunk: number, eachChunkDataNumber:number}) {
    const { eachChunkDataNumber, chunk } = args;
  const skip = ((chunk <= 0 ?1 : chunk) - 1) * eachChunkDataNumber;
  const analytics = await prisma.customerAnalyticData.findMany({
    skip: skip,
    take: eachChunkDataNumber,
    orderBy: {
      analyticId: "asc",
    },
  });
  return analytics;
}