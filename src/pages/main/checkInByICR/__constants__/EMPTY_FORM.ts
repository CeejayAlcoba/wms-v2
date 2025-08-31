import type { CheckInByICRDTO } from "../../../../@types/DTOs/CheckInByICRDTO";
import { EMPTY_CARGO } from "./EMPTY_CARGO";
export const EMPTY_FORM: CheckInByICRDTO = {
  bookingDetails: {
    cargoTypeId: null,
    actualCheckInDate: null,
    icrReferenceNumber: null,
    principalId: null,
    productCategoryId: null,
    truckDetailsId: null,
    drNumber: null,
    palleteGroupId: null,
  },
  cargoDetails: [EMPTY_CARGO],
  billingInformation: {
    bookingDetailsId: null,
    handlingInRate: null,
    handlingInBillTypeId: null,
    handlingOutRate: null,
    handlingOutBillTypeId: null,
    storageRate: null,
    storageBillTypeId: null,
    valueAddedTax: null,
  },
};
