import { Router } from "express";
import customerController from "../controllers/customerController.ts";
import validate from "../middlewares/validateMiddleware.ts";
import { createCustomerSchemaValidator } from "../validators/user/createCustomerSchemaValidator.ts";
import { updateCustomerSchemaValidator } from "../validators/user/updateCustomerSchemaValidator.ts";

const customerRouter = Router();


customerRouter.post("/create",validate(createCustomerSchemaValidator), customerController.createCustomer);
customerRouter.post("/update",validate(updateCustomerSchemaValidator), customerController.updateCustomer);
customerRouter.get("/getall", customerController.getCustomers)
customerRouter.get("/getone/:customerId", customerController.getCustomer);


export default customerRouter;
