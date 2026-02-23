import type { Analytic, Queue } from "../../../generated/prisma/browser";
import prisma from "../../../lib/prisma";
import { computeTotalBidonNumber } from "./computeTotalBidonNumber";

function findAnalyticByCustomerId(customerId: string, analytics: Analytic[]){
  const found = analytics.find((analytic)=>analytic.customerId === customerId);
  return found;
}

export async function persistAnalytic(customerId: string,analytics: Analytic[],queues: Queue[], startDate: Date, endDate: Date) : Promise<{message: string}>{
  const computedTotalBidonNumber = computeTotalBidonNumber(queues);
  const analytic = findAnalyticByCustomerId(customerId, analytics);
  return prisma.analytic.upsert({
    where: {
      customerId: customerId,
      id: analytic?.id || ""
    },
    create: {
      totalBidonNumber: computedTotalBidonNumber,
      customerId: customerId,
      customerAnalyticsData: {
        create: {
          bidonNumber: computedTotalBidonNumber,
          customerVisiteForDateRange: queues.length,
          dateRangeStart: startDate.toISOString(),
          dateRangeEnd: endDate.toISOString()
        }
      }
    }, 
    update:{
      totalBidonNumber: analytic?.totalBidonNumber ? analytic.totalBidonNumber + computedTotalBidonNumber : computedTotalBidonNumber,
      customerAnalyticsData: {
        create: {
            bidonNumber: computedTotalBidonNumber,
            customerVisiteForDateRange: queues.length,
            dateRangeStart: startDate.toISOString(),
            dateRangeEnd: endDate.toISOString()
        }
      }
    }
  }).then(()=>{
    return {message: "persisting analytic for customer " + customerId + " successfull."}
  })
}
