import type { RequestHandler } from "express";
import queueService from "../services/queueService";

const createQueue: RequestHandler = (req, res)=>{
    const requestBody = req?.body;
    queueService.createQueue({bidonNumber: requestBody.bidonNumber, customerId: requestBody.customerId})
    .then((createdQueue)=>{
        res.status(200).json(createdQueue);
    }).catch(()=>{
        res.status(500).json({message: "could not create Queue"})
    });
}

const updateQueue: RequestHandler = (req, res)=>{
    const requestBody = req?.body;
    queueService.updateQueue({bidonNumber: requestBody.bidonNumber, queueId: requestBody.queueId})
    .then((updatedQueue)=>{
        res.status(200).json(updatedQueue);
    }).catch(()=>{
        res.status(500).json({message: "could not update Queue"})
    });

}

const getQueues: RequestHandler = (req, res)=>{
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    queueService.getQueues({pageNumber: page}).then((queues)=>{
        res.status(200).json(queues)
    }).catch(()=>{
        res.status(500).json({message: "could not find queues"})
    })
}


export default {
    createQueue,
    updateQueue,
    getQueues
}