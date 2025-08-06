import type { BookingDetails } from "../tables/BookingDetails";

export type BookingDetailsDTO = {
  principal?: string;
  productCategory?: string;
  truckPlateNumber?: string;
  palleteGroup?: string;
  goodsReceipt?: string;
} & BookingDetails;
