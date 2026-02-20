import type { RequestHandler } from "express";
import customerService from "../services/customerService";

const createCustomer: RequestHandler = (req, res)=>{
    const requestBody = req?.body;
    customerService.createCustomer({
        name: requestBody.name
    }).then((createdCustomer)=>{
        res.status(200).json(createdCustomer);
    }).catch(()=>{
        res.status(500).json({message: "could not create customer"})
    });
}

const updateCustomer: RequestHandler = (req, res)=>{
    const requestBody = req?.body;
    customerService.updateCustomer({
        customerStatus: requestBody.customerStatus,
        id: requestBody.id
    }).then((updatedUser)=>{
        res.status(200).json(updatedUser);
    }).catch(()=>{
        res.status(500).json({message: "could not update customer"})
    });
}

const getCustomer : RequestHandler = (req, res)=>{
    const customerId = req.params.customerId;
    if(!customerId || customerId.length === 0){
        res.status(500).json({message: "customer id not provided"})
    }else{
        customerService.getCustomer({id: customerId as string}).then((updatedUser)=>{
            res.status(200).json(updatedUser);
        }).catch(()=>{
            res.status(500).json({message: "could not updateucustomer"})
        });
    }
}

const getCustomers: RequestHandler = (req, res) => {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;

    customerService.getCustomers({pageNumber: page}).then((updatedUser)=>{
        res.status(200).json(updatedUser);
    }).catch(()=>{
        res.status(500).json({message: "could not get customers"})
    });
}


export default {
    createCustomer,
    updateCustomer,
    getCustomer,
    getCustomers
}