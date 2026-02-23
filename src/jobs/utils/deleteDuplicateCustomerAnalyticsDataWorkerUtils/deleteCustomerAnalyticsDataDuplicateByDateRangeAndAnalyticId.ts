import prisma from "../../../lib/prisma";

export async function deleteCustomerAnalyticsDataDuplicateByDateRangeAndAnalyticIdAndExcludeOne(
  dateRange: { start: string; end: string},
  analyticId: string,
  idToExclude: string
) {
  return await prisma.customerAnalyticData.deleteMany({
    where: {
      analyticId: analyticId,
      dateRangeStart: dateRange.start,
      dateRangeEnd: dateRange.end,
      AND: {
        NOT: {
          id: idToExclude,
        },
      },
    },
  });
}
