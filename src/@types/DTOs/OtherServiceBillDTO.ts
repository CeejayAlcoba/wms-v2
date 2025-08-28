import type { OtherServiceBill } from "../tables/OtherServiceBill";
import type { RefServiceField } from "../tables/RefServiceField";
import type { ServiceConfigDTO } from "./ServiceConfigDTO";

export type OtherServiceBillDTO = {
  serviceConfig?: ServiceConfigDTO;
  serviceFields: RefServiceField[];
} & OtherServiceBill;
