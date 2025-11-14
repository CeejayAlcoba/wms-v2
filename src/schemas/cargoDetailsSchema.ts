import * as yup from "yup";
import type { CargoDetails } from "../@types/tables/CargoDetails";
import { requiredMessage } from "./yupInitials";

export const cargoDetailsSchema: yup.Schema<CargoDetails> = yup.object().shape({
  id: yup.number().nullable(),
  name: yup.string().nullable(),
  description: yup.string().required(requiredMessage),
  skuCode: yup.string().required(requiredMessage),
  proNumber: yup.string().nullable(),
  deliveryNote: yup.string().nullable(),
  unitOfMeasurementId: yup.number().required(requiredMessage),
  batchNo: yup.string().nullable(),
  expirationDate: yup.string().nullable(),
  palleteCount: yup.number().nullable(),
  quantity: yup.number().required(requiredMessage),
  lengthCm: yup.number().required(requiredMessage),
  heightCm: yup.number().required(requiredMessage),
  widthCm: yup.number().required(requiredMessage),
  cubicMeter: yup.number().required(requiredMessage).moreThan(0, "Value must be greater than 0"),
  customerName: yup.string().nullable(),
  shelfDetailsId: yup.number().nullable(),
  totalAmount: yup.number().nullable(),
  bookingDetailsId: yup.number().nullable(),
});
