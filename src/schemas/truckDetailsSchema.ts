import * as yup from "yup";
import { requiredMessage } from "./yupInitials";
import type { RefTruckDetails } from "../@types/tables/RefTruckDetails";

export const truckDetailsSchema: yup.Schema<RefTruckDetails> = yup.object({
  plateNumber: yup.string().required(requiredMessage),
  truckTypeId: yup.number().required(requiredMessage),
  driverName: yup.string().required(requiredMessage),
});
