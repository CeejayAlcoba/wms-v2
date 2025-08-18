import * as yup from "yup";
import { requiredMessage } from "./yupInitials";
import type { RefRole } from "../@types/tables/RefRole";

export const roleSchema: yup.Schema<RefRole> = yup.object({
  id: yup.number().nullable(),
  name: yup.string().required(requiredMessage),
});
