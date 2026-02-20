import { Router } from "express";
import customerController from "../controllers/customerController";
import validate from "../middlewares/validateMiddleware";
import { createCustomerSchemaValidator } from "../validators/user/createCustomerSchemaValidator";
import { updateCustomerSchemaValidator } from "../validators/user/updateCustomerSchemaValidator";

const customerRouter = Router();


customerRouter.post("/create",validate(createCustomerSchemaValidator), customerController.createCustomer);
customerRouter.post("/update",validate(updateCustomerSchemaValidator), customerController.updateCustomer);
customerRouter.get("/getall/", customerController.getCustomers)
customerRouter.get("/getone/:customerId", customerController.getCustomer);


export default customerRouter;
