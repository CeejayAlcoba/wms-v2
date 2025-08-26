import type { BillingStatement } from "../tables/BillingStatement";

export type BillingStatementDTO = {
  principal: string;
  productCategory: string;
} & BillingStatement;
