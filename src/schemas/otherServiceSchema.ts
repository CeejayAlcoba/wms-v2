import * as yup from "yup";
import { requiredMessage } from "./yupInitials";
import { otherServiceFieldSchema } from "./otherServiceFieldSchema";
import type { OtherServiceDTO } from "../@types/DTOs/OtherServiceDTO";

export const otherServiceSchema: yup.Schema<OtherServiceDTO> = yup.object({
  name: yup.string().required(requiredMessage),
  noOfFields: yup.number().required(requiredMessage),
  formula: yup.string().required(requiredMessage),
  otherServiceFields: yup
    .array()
    .of(otherServiceFieldSchema)
    .min(1, "At least one field is required")
    .required(requiredMessage),
});
