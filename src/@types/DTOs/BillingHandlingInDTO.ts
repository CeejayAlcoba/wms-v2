export type BillingHandlingInDTO = {
  details: HandlingInDetails[];
  totals?: HandlingInTotals;
};

export type HandlingInDetails = {
  actualCheckInDate: Date;
  icrReferenceNumber: string;
  quantity: number;
  cubicMeter: number;
  palleteCount: number;
  totalCbmPerDay: number;
};

export type HandlingInTotals = {
  handlingInRate: number;
  billType: string;
  total: number;
  bill: number;
};
