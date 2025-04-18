import * as yup from "yup";
export const validationLoginPage = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const validationSignupPage = yup.object().shape({
  fullName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  username: yup.string().required(),
});

export const validationForgetPasswordPage = yup.object().shape({
  email: yup.string().email().required(),
});
export const validationCode = yup.object({
  code: yup
    .string()
    .matches(/^\d{6}$/, "Code must be 6 digits")
    .required("Code is required"),
});

export const validationResetPassword = yup.object({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[A-Z]/, "Must include at least one uppercase letter")
    .matches(/\d/, "Must include at least one number")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
