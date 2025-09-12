import type { RefTruckDetails } from "../tables/RefTruckDetails";

export type TruckDetailsDTO = {
  truckType: string | null;
} & RefTruckDetails;
