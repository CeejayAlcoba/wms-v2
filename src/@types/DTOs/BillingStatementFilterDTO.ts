import type { IPaginationFilter } from "../pagination/IPaginationFilter";
import type { BillingStatement } from "../tables/BillingStatement";

export type BillingStatementFilterDTO =  & BillingStatement & IPaginationFilter;
