import type { BillingStatement } from "../@types/tables/BillingStatement";
import genericService from "./genericService";

const path = "billing-statement";

function _billingStatementService() {
  return { ...genericService<BillingStatement>(path) };
}

export const billingStatementService = _billingStatementService();
