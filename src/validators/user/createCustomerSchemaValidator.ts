import yup from "yup";

export const createCustomerSchemaValidator = yup.object().shape({
    name: yup.string().required("name is required"),
});
