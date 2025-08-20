import type { BillingHandlingInDTO } from "./BillingHandlingInDTO";
import type { BillingHandlingOutDTO } from "./BillingHandlingOutDTO";
import type { BillingStorageDTO } from "./BillingStorageDTO";

export type BillingDTO = {
  handlingIn?: BillingHandlingInDTO;
  handlingOut?: BillingHandlingOutDTO;
  storage?: BillingStorageDTO;
  unVatableAmount: number;
  vat?: number;
  vatCost?: number;
  vatableAmount: number;
};
