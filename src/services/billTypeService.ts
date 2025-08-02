import type { MasterBillType } from "../@types/tables/MasterBillType";
import genericService from "./genericService";

const path = "bill-type";

function _billTypeService() {
  return { ...genericService<MasterBillType>(path) };
}

export const billTypeService = _billTypeService();
