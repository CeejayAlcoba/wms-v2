export type BillingHandlingOutDTO = {
  details: HandlingOutDetails[];
  totals?: HandlingOutTotals;
};

export type HandlingOutDetails = {
  pullOutDate: Date;
  ocrNumber: string;
  quantity: number;
  cubicMeter: number;
  palleteCount: number;
  totalCbmPerDay: number;
  isAdjusted: boolean;
};

export type HandlingOutTotals = {
  handlingOutRate: number;
  billType: string;
  total: number;
  bill: number;
};
