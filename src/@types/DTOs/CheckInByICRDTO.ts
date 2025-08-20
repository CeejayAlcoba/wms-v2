import type { BillingInformation } from "../tables/BillingInformation";
import type { BookingDetails } from "../tables/BookingDetails";
import type { CargoDetails } from "../tables/CargoDetails";

export type CheckInByICRDTO = {
  bookingDetails: BookingDetails;
  cargoDetails: CargoDetails[];
  billingInformation: BillingInformation;
};
