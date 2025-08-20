import type { BillingConfiguration } from "../tables/BillingConfiguration";

export type BillingConfigurationDTO = {
  principal?: string | null;
  handlingInBillType?: string | null;
  handlingOutBillType?: string | null;
  storageBillType?: string | null;
} & BillingConfiguration;
