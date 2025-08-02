import * as yup from "yup";
import { requiredMessage } from "./yupInitials";
import type { RefProductCategory } from "../@types/tables/RefProductCategory";

export const productCategorySchema: yup.Schema<RefProductCategory> = yup.object(
  {
    id: yup.number().nullable(),
    name: yup.string().required(requiredMessage),
    principalId: yup.number().required(requiredMessage),
  }
);
