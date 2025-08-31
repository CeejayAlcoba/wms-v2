import type { BookingDetailsFilterDTO } from "../../../../@types/DTOs/BookingDetailsFilterDTO";

export const EMPTY_BOOKING_DETAILS: BookingDetailsFilterDTO = {
  id: null,
  cargoTypeId: null,
  actualCheckInDate: null,
  icrReferenceNumber: null,
  principalId: null,
  productCategoryId: null,
  truckDetailsId: null,
  drNumber: null,
  palleteGroupId: null,
  goodsReceiptId: null,
  currentPage: 1,
  pageSize: 10,
};
