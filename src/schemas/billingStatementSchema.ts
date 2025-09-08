import * as yup from "yup";
import { minZeroMessage, requiredMessage } from "./yupInitials";
import type { BillingStatementWithServiceReportDTO } from "../@types/DTOs/BillingStatementWithServiceReportDTO";
import type { OtherServiceBillDTO } from "../@types/DTOs/OtherServiceBillDTO";
import validateBillingReference from "./utils/validateBillingReference";
import { billingStatementService } from "../services/billingStatementService";

const otherServiceBillDTOSchema: yup.Schema<OtherServiceBillDTO> = yup
  .object()
  .shape({
    totalAmount: yup.number().min(0, minZeroMessage).required(requiredMessage),
    date: yup.string().required(requiredMessage),
    serviceConfigId: yup.number().required(requiredMessage),
    serviceFields: yup
      .array()
      .of(
        yup.object().shape({
          value: yup.number().min(0, minZeroMessage).required(requiredMessage),
        })
      )
      .required(requiredMessage),
  });

export const billingStatementSchema: yup.Schema<BillingStatementWithServiceReportDTO> =
  yup
    .object()
    .shape({
      id: yup.number().notRequired(),
      principalId: yup.number().required(requiredMessage),
      productCategoryId: yup.number().required(requiredMessage),
      dateFrom: yup.string().required(requiredMessage),
      dateTo: yup.string().required(requiredMessage),
      referenceNumber: yup
        .string()
        .required(requiredMessage)
        .test(
          "unique-Reference-number",
          "Reference number already exists.",
          async function (value) {
            const { id } = this.parent;
            if (!value) return true;

            const billingStatements: any = await validateBillingReference(
              value
            );
            const isDuplicate = billingStatements.some((d: any) => d.id !== id);
            return !isDuplicate;
          }
        ),
      otherServiceBills: yup
        .array()
        .of(otherServiceBillDTOSchema)
        .min(0)
        .default([]),
    })
    .test(
      "unique-date",
      "A billing statement with this date range already exists.",
      async function (value) {
        if (!value) return true;
        const { id, dateFrom, dateTo } = value;

        const billingStatements = await billingStatementService.GetAll({
          dateFrom,
          dateTo,
        });

        if (!billingStatements) return true;
        if (billingStatements[0].id != id) {
          return this.createError({
            path: "dateFrom",
            message: "Date range already exists.",
          });
        }
        return true;
      }
    );
