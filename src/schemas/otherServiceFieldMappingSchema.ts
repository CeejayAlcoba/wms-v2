import * as yup from "yup";
import { requiredMessage } from "./yupInitials";
import type { OtherServiceFieldMappingDTO } from "../@types/DTOs/OtherServiceFieldMappingDTO";

export const otherServiceFieldSchema: yup.Schema<OtherServiceFieldMappingDTO> =
  yup.object({
    jsonKey: yup.string().required(requiredMessage),
    name: yup.string().required(requiredMessage),
  });
