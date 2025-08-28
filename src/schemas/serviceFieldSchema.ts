import * as yup from "yup";
import { requiredMessage } from "./yupInitials";
import type { RefServiceField } from "../@types/tables/RefServiceField";

export const serviceFieldSchema: yup.Schema<RefServiceField> = yup.object({
  jsonKey: yup.string().required(requiredMessage),
  name: yup.string().required(requiredMessage),
});
