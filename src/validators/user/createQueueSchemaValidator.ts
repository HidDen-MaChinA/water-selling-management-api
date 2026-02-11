import yup from 'yup';

export const createQueueSchemaValidator = yup.object().shape({
        customerId: yup.string().uuid().required("customerId is required"),
        bidonNumber: yup.number().required("bidonNumber is required")
});