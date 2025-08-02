import * as yup from "yup";
import { requiredMessage } from "./yupInitials";
import type { MasterAntIcon } from "../@types/tables/MasterAntIcon";

export const antIconSchema: yup.Schema<MasterAntIcon> = yup.object({
  name: yup.string().required(requiredMessage),
});
