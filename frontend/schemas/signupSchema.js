import * as yup from "yup";

const phoneRegex = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
export const signupSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  name: yup.string().matches(/^[A-Za-z]+$/, "name can only accept alphabets").required(),
  address: yup.string().required(),
  phone: yup.string().matches(phoneRegex, 'Phone number is not valid').required(),
  branch: yup.string().required()
});