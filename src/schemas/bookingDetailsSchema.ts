import * as yup from "yup";
import type { BookingDetails } from "../@types/tables/BookingDetails";
import { requiredMessage } from "./yupInitials";

export const bookingDetailsSchema: yup.Schema<BookingDetails>  = yup.object().shape({
  id: yup.number().nullable(),
  cargoTypeId: yup.number().required(requiredMessage),
  actualCheckInDate: yup.date().required(requiredMessage),
  iCRReferenceNumber: yup.string().required(requiredMessage),
  principalId: yup.number().required(requiredMessage),
  productCategoryId: yup.number().required(requiredMessage),
  truckDetailsId: yup.number().nullable(),
  drNumber: yup.string().nullable(),
  palleteGroupId: yup.number().nullable()
});