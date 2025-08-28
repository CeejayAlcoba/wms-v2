import * as yup from "yup";
import { requiredMessage } from "./yupInitials";
import type { ServiceConfigDTO } from "../@types/DTOs/ServiceConfigDTO";

export const serviceConfigSchema: yup.Schema<ServiceConfigDTO> = yup.object({
  name: yup.string().required(requiredMessage),
  noOfFields: yup.number().required(requiredMessage),
  formula: yup.string().required(requiredMessage),
  serviceFields: yup
    .array()
    .of(
      yup.object({
        id: yup.number().required(requiredMessage),
      })
    )
    .min(1, "At least one field is required")
    .required(requiredMessage),
});
