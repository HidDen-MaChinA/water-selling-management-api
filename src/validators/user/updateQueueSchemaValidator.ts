import yup from 'yup';

export const updateQueueSchemaValidator = yup.object().shape({
        queueNumber: yup.string().uuid().required("customerId is required"),
        bidonNumber: yup.number().required("bidonNumber is required")
});