import yup from 'yup';
import { CustomerStatus } from '../../generated/prisma/enums.ts';

export const updateCustomerSchemaValidator = yup.object().shape({
    id: yup.string().required("customer id is required"),
    customerStatus: yup.string().oneOf([CustomerStatus.ACTIF, CustomerStatus.BANNED])
});