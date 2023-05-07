import * as yup from "yup";

const inputsSchema = {
  fullName: yup
    .string()
    .required("This field is required")
    .matches(/^[a-z\s\-']+$/i, "Invalid Name"),
  firstName: yup
    .string()
    .required("This field is required")
    .matches(/^[a-z\s\-']+$/i, "Invalid Name"),
  lastName: yup
    .string()
    .required("This field is required")
    .matches(/^[a-z\s\-']+$/i, "Invalid Name"),
  AddressLine1: yup
    .string()
    .required("This field is required")
    .matches(/^[a-z\s\-']+$/i, "Invalid Address"),
  AddressLine2: yup
    .string()
    .notRequired()
    .matches(/^[a-z\s\-']+$/i, "Invalid Address"),
  age: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === "" ? null : value;
    })
    .nullable()
    .notRequired()
    .typeError("Must be a number")
    .positive("number must be positive")
    .max(100, "Maximum number is 100")
    .integer("must be an integer"),
};

export default inputsSchema;
