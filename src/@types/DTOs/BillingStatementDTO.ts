import type { BillingStatement } from "../tables/BillingStatement";

export type BillingStatementDTO = {
  principal?: string | null;
  handlingInBillType?: string | null;
  handlingOutBillType?: string | null;
  storageBillType?: string | null;
} & BillingStatement;
