export type BookingDetails = {
  id?: number | null;
  cargoTypeId: number| null;
  actualCheckInDate: Date| null;
  iCRReferenceNumber: string| null;
  principalId: number| null;
  productCategoryId: number| null;
  truckDetailsId?: number| null;
  drNumber?: string| null;
  palleteGroupId?: number| null;
};
