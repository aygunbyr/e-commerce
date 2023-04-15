import * as yup from "yup";

const validations = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid email address.")
    .required("Email is required."),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters.")
    .required("Password is required."),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords does not match.")
    .required("Enter password to confirm."),
});

export default validations;
