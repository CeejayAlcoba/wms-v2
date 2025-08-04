import * as yup from "yup";
import { requiredMessage } from "./yupInitials";
import type { RefTruckType } from "../@types/tables/RefTruckType";

export const truckTypeSchema: yup.Schema<RefTruckType> = yup.object({
  name: yup.string().required(requiredMessage),
});
