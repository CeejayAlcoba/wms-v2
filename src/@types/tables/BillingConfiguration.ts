export type BillingConfiguration = {
  id?: number | null;
  principalId?: number | null;
  handlingInRate?: number | null;
  handlingInBillTypeId?: number | null;
  handlingOutRate?: number | null;
  handlingOutBillTypeId?: number | null;
  storageRate?: number | null;
  storageBillTypeId?: number | null;
  valueAddedTax?: number | null;
};
