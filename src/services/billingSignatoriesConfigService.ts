import type { BillingSignatoriesConfig } from "../@types/tables/BillingSignatoriesConfig";
import genericService from "./genericService";

const path = "billing-signatories-config";

function _billingSignatoriesConfigService() {
  return { ...genericService<BillingSignatoriesConfig>(path) };
}

export const billingSignatoriesConfigService = _billingSignatoriesConfigService();
