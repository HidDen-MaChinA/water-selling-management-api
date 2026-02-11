import type { Customer } from "../generated/prisma/browser.ts"
import prisma from "../lib/prisma.ts"

const createQueue = async (arg: {currentCustomerId: string, bidonNumber: number} )=>{
    return await prisma.queue.create({
        data:{
            currentCustomerId:arg.currentCustomerId,
            bidonNumber: arg.bidonNumber,
        }
    })

}

const updateQueue = async (arg:{queueId:string, bidonNumber: number})=>{
    return await prisma.queue.update({
        where: {
            id: arg.queueId
        },
        data:{
            bidonNumber: arg.bidonNumber,
        }
    })
}


const customerPerPage = 10;
const getQueues = async (arg: {pageNumber: number})=>{
    const page = arg.pageNumber || 1 
    const skip = ((page <= 0 ? 1 : page) - 1) * customerPerPage;
    return await prisma.queue.findMany({
        skip: skip,
        take: customerPerPage,
        orderBy: {
            createdAt: "asc"
        }
    });
}


export default {
    createQueue,
    updateQueue,
    getQueues
}