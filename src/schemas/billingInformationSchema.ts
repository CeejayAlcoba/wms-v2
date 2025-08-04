import * as yup from "yup";
import type { BillingInformation } from "../@types/tables/BillingInformation";
import { requiredMessage } from "./yupInitials";

export const billingInformationSchema : yup.Schema<BillingInformation> = yup.object().shape({
  id: yup.number().nullable(),
  bookingDetailsId: yup.number().nullable(),
  handlingInRate: yup.number().required(requiredMessage),
  handlingInBillTypeId: yup.number().required(requiredMessage),
  handlingOutRate: yup.number().required(requiredMessage),
  handlingOutBillTypeId: yup.number().required(requiredMessage),
  storageRate: yup.number().required(requiredMessage),
  storageBillTypeId: yup.number().required(requiredMessage),
  valueAddedTax: yup.number().required(requiredMessage),

});