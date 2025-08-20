import * as yup from "yup";
import { requiredMessage } from "./yupInitials";
import type { BillingFilterDTO } from "../@types/DTOs/BillingFilterDTO";

export const billingFilterSchema: yup.Schema<BillingFilterDTO> = yup.object({
  principalId: yup.number().required(requiredMessage),
  productCategoryId: yup.number().required(requiredMessage),
  dateFrom: yup.date().required(requiredMessage),
  dateTo: yup.date().required(requiredMessage),
});
