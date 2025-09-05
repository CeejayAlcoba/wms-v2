import type { IPaginationTotal } from "../pagination/IPaginationTotal";
import type { BillingStatement } from "../tables/BillingStatement";

export type BillingStatementDTO = {
  principal: string;
  principalAddress: string;
  productCategory: string;
} & BillingStatement &
  IPaginationTotal;
