import yup from "yup";

export const createUserSchemaValidator = yup.object().shape({
    name: yup.string().required("name is required"),
    password: yup.string().required("password is required"),
    role: yup.string().oneOf(["ADMIN", "USER"])
});
