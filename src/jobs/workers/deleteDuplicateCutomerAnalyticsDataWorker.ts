import { deleteAllDuplicatesCustomerAnalyticsData } from "../utils/deleteDuplicateCustomerAnalyticsDataWorkerUtils/deleteAllDuplicatesCustomerAnalyticsData";
import { getChunkNumber } from "../utils/deleteDuplicateCustomerAnalyticsDataWorkerUtils/getChunkNumber";
import { getCustomerAnalyticsDataChunk } from "../utils/deleteDuplicateCustomerAnalyticsDataWorkerUtils/getCustomerAnalyticsDataChunk";

const eachChunkDataNumber = 100;
const chunkNumber = await getChunkNumber(eachChunkDataNumber);
const totalPageNumber = eachChunkDataNumber > chunkNumber ? 1 : Math.ceil(Math.round(chunkNumber / eachChunkDataNumber))
loadAndProcessChunks(totalPageNumber);


function loadAndProcessChunks(totalPageNumber: number) {
  for (let chunk = 1; chunk <= totalPageNumber; chunk++) {
    getCustomerAnalyticsDataChunk({
      chunk: chunk,
      eachChunkDataNumber: eachChunkDataNumber,
    }).then((customerAnalyticsData) => {
      deleteAllDuplicatesCustomerAnalyticsData(customerAnalyticsData);
    });
  }
}






