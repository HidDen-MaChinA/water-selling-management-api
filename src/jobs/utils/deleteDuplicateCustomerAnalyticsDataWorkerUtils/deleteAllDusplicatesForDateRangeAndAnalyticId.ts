import { deleteCustomerAnalyticsDataDuplicateByDateRangeAndAnalyticIdAndExcludeOne } from "./deleteCustomerAnalyticsDataDuplicateByDateRangeAndAnalyticId";
import { getLatestCreatedCustomerAnalyticDataByDateRangeAndAnalyticId } from "./getLatestCreatedCustomerAnalyticDataByDateRangeAndAnalyticId";

export async function deleteAllDuplicatesForDateRangeAndAnalyticId(
  dateRange: { start: string; end: string},
  analyticId: string
) {
    const latestCreatedCustomer = await getLatestCreatedCustomerAnalyticDataByDateRangeAndAnalyticId(dateRange, analyticId);
    if(latestCreatedCustomer){
        await deleteCustomerAnalyticsDataDuplicateByDateRangeAndAnalyticIdAndExcludeOne(dateRange, analyticId, latestCreatedCustomer.id)
    }
    return;
}