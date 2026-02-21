import prisma from "../lib/prisma"

const perPage = 10;
const getAnalytics = async (page: number)=>{
    const skip = ((page <= 0 ? 1 : page) - 1) * perPage;
    return await prisma.analytic.findMany({
        skip: skip,
        take: perPage,
        orderBy: {
           updatedAt : 'asc'
        },
        include: {
            customer: true,
            customerAnalyticsData: true
        }
    });                                                                
}

export default {
    getAnalytics
}
