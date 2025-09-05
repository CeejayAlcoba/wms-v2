import * as yup from "yup";
import { requiredMessage } from "./yupInitials";
import type { BillingSignatoriesConfig } from "../@types/tables/BillingSignatoriesConfig";

export const billingSignatoriesConfigSchema: yup.Schema<BillingSignatoriesConfig> =
  yup.object({
    title: yup.string().required(requiredMessage),
    name: yup.string().required(requiredMessage),
    sortOrder: yup.number().required(requiredMessage),
  });
