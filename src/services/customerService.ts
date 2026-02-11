import type { CustomerStatus } from "../generated/prisma/enums.ts"
import prisma from "../lib/prisma.ts"

const createCustomer = async (arg: {name: string})=>{
    return await prisma.customer.create({
        data:{
            name:arg.name,
        }
    })

}

const updateCustomer = async (arg: {id: string, customerStatus: CustomerStatus})=>{
   return await prisma.customer.update({
    where: {
        id:arg.id,
    },
    data: {
        status: arg.customerStatus
    }
   })
}

const getCustomer= async (arg: {id:string})=>{
    return await prisma.customer.findUnique({
        where: {
            id: arg.id,
        },
        include: {
            queue: true
        }
    });
}


const customerPerPage = 10;
const getCustomers = async (arg: {pageNumber?: number})=>{
    const page = arg.pageNumber || 1 
    const skip = ((page <= 0 ? 1 : page) - 1) * customerPerPage;
    return await prisma.customer.findMany({
        skip: skip,
        take: customerPerPage,
        orderBy: {
           name: 'asc'
        }
    });
    
}


export default {
    createCustomer,
    updateCustomer,
    getCustomer,
    getCustomers
}
