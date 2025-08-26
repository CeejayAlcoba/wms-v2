import * as yup from "yup";
import { requiredMessage } from "./yupInitials";
import { otherServiceReportsSchema } from "./otherServiceReportsSchema";
import type { BillingStatementWithServiceReportDTO } from "../@types/DTOs/BillingStatementWithServiceReportDTO";

export const billingStatementSchema: yup.Schema<BillingStatementWithServiceReportDTO> = yup
  .object()
  .shape({
    principalId: yup.number().required(requiredMessage),
    productCategoryId: yup.number().required(requiredMessage),
    dateFrom: yup.date().required(requiredMessage),
    dateTo: yup.date().required(requiredMessage),
    referenceNumber: yup.string().required(requiredMessage),
    otherServiceReports: yup
      .array()
      .of(otherServiceReportsSchema)
      .min(0)
      .default([]),
  });
