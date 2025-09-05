import type { BillingSignatoriesConfig } from "../tables/BillingSignatoriesConfig";
import type { BillingHandlingInDTO } from "./BillingHandlingInDTO";
import type { BillingHandlingOutDTO } from "./BillingHandlingOutDTO";
import type { BillingStatementWithServiceReportDTO } from "./BillingStatementWithServiceReportDTO";
import type { BillingStorageDTO } from "./BillingStorageDTO";

export type BillingDTO = {
  handlingIn?: BillingHandlingInDTO;
  handlingOut?: BillingHandlingOutDTO;
  storage?: BillingStorageDTO;
  billingStatement?: BillingStatementWithServiceReportDTO;
  signatoriesConfigs?: BillingSignatoriesConfig[];
  unVatableAmount: number;
  vat?: number;
  vatCost?: number;
  vatableAmount: number;
};
