import type { Queue } from "../../../generated/prisma/browser";

export function computeTotalBidonNumber(queues: Queue[]){
  return queues.map(queue=>queue.bidonNumber).reduce((a:number,b: number)=>a+b);
}