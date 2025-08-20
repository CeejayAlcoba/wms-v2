import * as yup from "yup";
import { billingInformationSchema } from "./billingInformationSchema";
import { bookingDetailsSchema } from "./bookingDetailsSchema";
import { cargoDetailsSchema } from "./cargoDetailsSchema";
import type { CheckInByICRDTO } from "../@types/DTOs/CheckInByICRDTO";

export const checkInByICRSchema: yup.Schema<CheckInByICRDTO> = yup
  .object()
  .shape({
    bookingDetails: bookingDetailsSchema,
    cargoDetails: yup
      .array()
      .of(cargoDetailsSchema)
      .min(1, "At least one cargo detail is required")
      .required(),
    billingInformation: billingInformationSchema,
  });
