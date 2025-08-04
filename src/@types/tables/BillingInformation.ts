export type BillingInformation = {
  id?: number | null;
  bookingDetailsId?: number | null;
  handlingInRate: number | null;
  handlingInBillTypeId: number | null;
  handlingOutRate: number | null;
  handlingOutBillTypeId: number | null;
  storageRate: number | null;
  storageBillTypeId: number | null;
  valueAddedTax: number | null;
};
