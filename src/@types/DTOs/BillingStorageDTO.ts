export type BillingStorageDTO = {
  details: StorageDetails[];
  totals?: StorageTotals;
};

export type StorageDetails = {
  transDate: Date;
  quantity: number;
  palleteCount: number;
  inValue: number;
  outValue: number;
  balanceValue: number;
  cutOff: Date;
  noOfDays: number;
  bill: number;
};

export type StorageTotals = {
  storageRate: number;
  billType: string;
  totalBill: number;
};
