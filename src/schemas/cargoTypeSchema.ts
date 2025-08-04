import * as yup from "yup";
import { requiredMessage } from "./yupInitials";
import type { RefCargoType } from "../@types/tables/RefCargoType";

export const cargoTypeSchema: yup.Schema<RefCargoType> = yup.object({
  id: yup.number().nullable(),
  name: yup.string().required(requiredMessage),
});
