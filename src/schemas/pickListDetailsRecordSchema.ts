import * as yup from "yup";
import { minZeroMessage, requiredMessage } from "./yupInitials";
import type { PickListDetailsRecordDTO } from "../@types/DTOs/PicklistDetailsRecordDTO";

export const pickListDetailsRecordSchema: yup.Schema<PickListDetailsRecordDTO> =
  yup.object().shape({
    id: yup.number().nullable(),
    pickListDetailsId: yup.number().nullable(),
    cargoDetailsId: yup.number().nullable(),
    quantity: yup
      .number()
      .required(requiredMessage)
      .min(0, minZeroMessage)
      .test(
        "min",
        "Quantity must not exceed the available limit.",
        async function (value) {
          return this.parent.cargoDetails.quantity >= value;
        }
      ),
    cubicMeter: yup.number().required(requiredMessage),
    palleteCount: yup
      .number()
      .required(requiredMessage)
      .min(0, minZeroMessage)
      .test(
        "min",
        "Pallete must not exceed the available limit.",
        async function (value) {
          return this.parent.cargoDetails.palleteCount >= value;
        }
      ),
    pullOutDate: yup.date().required(requiredMessage),
    pullOutDateRecieved: yup.date().required(requiredMessage),
    deliveryDueDate: yup.date().required(requiredMessage),
  });
