import * as yup from "yup";
import { requiredMessage } from "./yupInitials";
import type { OtherServiceReports } from "../@types/tables/OtherServiceReports";

export const otherServiceReportsSchema: yup.Schema<OtherServiceReports> = yup
  .object()
  .shape({
    principalId: yup.number().required(requiredMessage),
    billingStatementId: yup.number().required(requiredMessage),
    otherServiceId: yup.number().required(requiredMessage),
    jsonData: yup.string().required(requiredMessage),
    totalAmount: yup.number().required(requiredMessage),
  });
