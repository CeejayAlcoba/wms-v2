export type BillingStorageDTO = {
  details: StorageDetails[];
  totals?: StorageTotals;
};

export type StorageDetails = {
  transDate: Date;
  quantity: number;
  palleteCount: number;
  inCbm: number;
  outCbm: number;
  balanceCbm: number;
  cutOff: Date;
  noOfDays: number;
  bill: number;
};

export type StorageTotals = {
  storageRate: number;
  billType: string;
  totalBill: number;
};
