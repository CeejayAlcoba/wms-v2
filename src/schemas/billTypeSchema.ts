import * as yup from "yup";
import { requiredMessage } from "./yupInitials";
import type { MasterBillType } from "../@types/tables/MasterBillType";

export const billTypeSchema: yup.Schema<MasterBillType> = yup.object({
  id: yup.number().nullable(),
  name: yup.string().required(requiredMessage),
});
