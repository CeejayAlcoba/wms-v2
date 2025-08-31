import * as Yup from "yup";
import type { UserWithPasswordDTO } from "../@types/DTOs/UserWithPasswordDTO";
import { requiredMessage } from "./yupInitials";

export const userWithPasswordSchema: Yup.ObjectSchema<UserWithPasswordDTO> =
  Yup.object().shape({
    username: Yup.string().required(requiredMessage),
    firstName: Yup.string().required(requiredMessage),
    lastName: Yup.string().required(requiredMessage),
    employeeNumber: Yup.string().required(requiredMessage),
    birthday: Yup.string().required(requiredMessage),
    isApproved: Yup.boolean().nullable().default(false),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one symbol"
      ),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  }) as Yup.ObjectSchema<UserWithPasswordDTO>;
