import * as yup from "yup";
import { requiredMessage } from "./yupInitials";
import type { RefUnitOfMeasurement } from "../@types/tables/RefUnitOfMeasurement";

export const unitOfMeasurementSchema: yup.Schema<RefUnitOfMeasurement> = yup.object({
  name: yup.string().required(requiredMessage),
});
