import type { BillingStatement } from "../../../../@types/tables/BillingStatement";
export const EMPTY_FORM: BillingStatement = {
  id: null,
  principalId: null,
  handlingInRate: null,
  handlingInBillTypeId: null,
  handlingOutRate: null,
  handlingOutBillTypeId: null,
  storageRate: null,
  storageBillTypeId: null,
  valueAddedTax: null,
};
