import yup from "yup";

export const loginUserSchemaValidator = yup.object().shape({
    username: yup.string().required("name is required"),
    password: yup.string().required("password is required"),
});
