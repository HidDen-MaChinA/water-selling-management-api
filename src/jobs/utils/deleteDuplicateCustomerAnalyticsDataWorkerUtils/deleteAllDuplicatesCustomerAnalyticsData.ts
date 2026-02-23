import type { CustomerAnalyticData } from "../../../generated/prisma/browser";
import { deleteAllDuplicatesForDateRangeAndAnalyticId } from "./deleteAllDusplicatesForDateRangeAndAnalyticId";

export function deleteAllDuplicatesCustomerAnalyticsData(
  customerAnalyticsData: CustomerAnalyticData[]
) {
  const map = new Map<string, number>();
  for (let i = 0; i < customerAnalyticsData.length; i++) {
    const analyticId = customerAnalyticsData[i]?.analyticId;
    let endDate = customerAnalyticsData[i]?.dateRangeEnd;
    let startDate = customerAnalyticsData[i]?.dateRangeStart;
    const mapId = `${analyticId}/${endDate?.toISOString()}/${startDate?.toISOString()}`;
    const alreadySaved = map.get(mapId);
    map.set(mapId, alreadySaved ? alreadySaved + 1 : 1);
  }
  for (const [key, value] of map) {
    if (value <= 1) {
      continue;
    }
    const [analyticId, endDate, startDate] = key.split("/");
    if (endDate && startDate && analyticId)
      deleteAllDuplicatesForDateRangeAndAnalyticId(
        {
          end: endDate,
          start: startDate,
        },
        analyticId
      );
  }    
}
