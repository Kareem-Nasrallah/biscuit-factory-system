import * as Yup from "yup";
import validationMessages from "../ValidationMessages";

export const rawMaterialsSchema = Yup.object({
  name: Yup.string().required(validationMessages({}).required),
  nameAr: Yup.string().required(validationMessages({}).required),
  quantity: Yup.number()
    .required(validationMessages({}).required)
    .min(0, validationMessages({ min: 1 }).min),
  minStock: Yup.number()
    .required(validationMessages({}).required)
    .min(0, validationMessages({ min: 1 }).min),
  unit: Yup.string().required(validationMessages({}).required),
  supplier: Yup.string().required(validationMessages({}).required),
  supplierAr: Yup.string().required(validationMessages({}).required),
  price: Yup.number()
    .required(validationMessages({}).required)
    .min(0, validationMessages({ min: 1 }).min),
});
