import type { BillingConfiguration } from "../@types/tables/BillingConfiguration";
import genericService from "./genericService";

const path = "billing-Configuration";

function _billingConfigurationService() {
  return { ...genericService<BillingConfiguration>(path) };
}

export const billingConfigurationService = _billingConfigurationService();
