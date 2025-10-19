import * as Yup from "yup";
import validationMessages from "../ValidationMessages";

export const employeesSchema = Yup.object({
  name: Yup.string().required(validationMessages({}).required),
  nameAr: Yup.string().required(validationMessages({}).required),
  department: Yup.string().required(validationMessages({}).required),
  departmentAr: Yup.string().required(validationMessages({}).required),
  phone: Yup.string()
    .matches(/^\+?[0-9]\d{10}$/, validationMessages({}).invalid)
    .required(validationMessages({}).required),
  email: Yup.string()
    .email(validationMessages({}).email)
    .required(validationMessages({}).required),
  role: Yup.mixed<"Owner" | "Supervisor" | "Worker">().required(
    validationMessages({}).required
  ),
  shift: Yup.mixed<"Morning" | "Evening" | "Night">().required(
    validationMessages({}).required
  ),
  attendance: Yup.mixed<"Present" | "Absent">().required(
    validationMessages({}).required
  ),
});
