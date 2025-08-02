import * as yup from "yup";
import { minZeroMessage, requiredMessage } from "./yupInitials";
import type { BillingStatement } from "../@types/tables/BillingStatement";

export const billingStatementSchema: yup.Schema<BillingStatement> = yup.object({
  id: yup.number().nullable(),
  principalId: yup.number().required(requiredMessage),
  handlingInRate: yup.number().min(0, minZeroMessage).required(requiredMessage),
  handlingInBillTypeId: yup.number().required(requiredMessage),
  handlingOutRate: yup
    .number()
    .min(0, minZeroMessage)
    .required(requiredMessage),
  handlingOutBillTypeId: yup.number().required(requiredMessage),
  storageRate: yup.number().min(0, minZeroMessage).required(requiredMessage),
  storageBillTypeId: yup.number().required(requiredMessage),
  valueAddedTax: yup.number().min(0, minZeroMessage).required(requiredMessage),
});
