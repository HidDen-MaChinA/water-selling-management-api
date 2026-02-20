import type { Queue } from "../../../generated/prisma/browser";

export function parseQueues(queues: Queue[]) : Map<string, Queue[]> {
  const nameIndexMap = new Map<string, Queue[]>();
  for (let i = 0; i < queues.length; i++) {
    if (!queues || !queues[i]) {
      break;
    }
    const customerId = queues[i]!.customerId;
    let mapHasId = nameIndexMap.has(customerId);
    if (mapHasId) {
      const foundQueues = nameIndexMap.get(customerId);
      if (foundQueues) {
        foundQueues.push(queues[i]!);
        nameIndexMap.set(customerId, foundQueues);
      }
      continue;
    } else {
      nameIndexMap.set(customerId, [queues[i]!]);
    }
  }
  return nameIndexMap;
}