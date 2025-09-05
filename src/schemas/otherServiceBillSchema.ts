import * as yup from "yup";
import { requiredMessage } from "./yupInitials";
import type { OtherServiceBill } from "../@types/tables/OtherServiceBill";

export const otherServiceBillSchema: yup.Schema<OtherServiceBill> = yup
  .object()
  .shape({
    principalId: yup.number().required(requiredMessage),
    billingStatementId: yup.number().required(requiredMessage),
    otherServiceId: yup.number().required(requiredMessage),
    jsonData: yup.string().required(requiredMessage),
    totalAmount: yup.number().required(requiredMessage),
    date: yup.string().required(requiredMessage),
  });
