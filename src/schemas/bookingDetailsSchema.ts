import * as yup from "yup";
import type { BookingDetails } from "../@types/tables/BookingDetails";
import { requiredMessage } from "./yupInitials";
import validateICRReference from "./utils/validateICRReference";

export const bookingDetailsSchema: yup.Schema<BookingDetails> = yup
  .object()
  .shape({
    id: yup.number().nullable(),
    cargoTypeId: yup.number().required(requiredMessage),
    actualCheckInDate: yup.date().required(requiredMessage),
    iCRReferenceNumber: yup
      .string()
      .required(requiredMessage)
      .min(4, "ICR must be at least 4 characters.")
      .test("unique-icr", "", async function (value) {
        const { id } = this.parent;
        if (!value) return true;

        const bookings: any = await validateICRReference(value);
        const isDuplicate = bookings.some((d: any) => d.id !== id);

        if (isDuplicate) {
          return this.createError({
            message: `ICR ${value} already exists.`,
          });
        }

        return true;
      }),
    principalId: yup.number().required(requiredMessage),
    productCategoryId: yup.number().required(requiredMessage),
    truckDetailsId: yup.number().nullable(),
    drNumber: yup.string().nullable(),
    palleteGroupId: yup.number().nullable(),
  });
