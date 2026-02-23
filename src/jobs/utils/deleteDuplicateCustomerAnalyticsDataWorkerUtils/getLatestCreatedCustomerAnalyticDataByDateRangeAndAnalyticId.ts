import prisma from "../../../lib/prisma";

export async function getLatestCreatedCustomerAnalyticDataByDateRangeAndAnalyticId(
  dateRange: { start: string; end: string},
  analyticId: string
) {
  return await prisma.customerAnalyticData.findFirst({
    where: {
      analyticId: analyticId,
      dateRangeStart: dateRange.start,
      dateRangeEnd: dateRange.end,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}