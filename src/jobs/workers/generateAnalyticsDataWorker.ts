import { workerData } from "worker_threads";
import prisma from "../../lib/prisma";
import { createDateRangeForScoop } from "../utils/generateAnalyticsDataWorkersUtils/createDateRangeForScoop";
import { parseQueues } from "../utils/generateAnalyticsDataWorkersUtils/parseQueues";
import { persistAnalytic } from "../utils/generateAnalyticsDataWorkersUtils/persistAnalytic";
import yup from "yup";

const argValidator = yup.string().oneOf(["day", "week", "month", "year"]);

const {timeScoop} = workerData;

const validatedTimeScoop = await argValidator.validate( timeScoop )

if(!validatedTimeScoop){
  process.exit(1);
}

const dateRange = createDateRangeForScoop(validatedTimeScoop);

const queues = await prisma.queue.findMany({
  where: {
    createdAt: {
      gte: dateRange.startDate.toISOString(),
      lte: dateRange.endDate.toISOString(),
    },
  },
});



const parsedQueuesInAHashMap = parseQueues(queues);
const analytics = await prisma.analytic.findMany({
  where: {
    customerId:{
      in: parsedQueuesInAHashMap.keys().toArray()
    }
  }
})

parsedQueuesInAHashMap.forEach((value, key)=>{
  persistAnalytic(key, analytics, value, dateRange.startDate, dateRange.endDate).then((message)=>{
    console.log(message.message)
  });
})
