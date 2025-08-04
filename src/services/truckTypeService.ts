import type { RefTruckType } from "../@types/tables/RefTruckType";
import genericService from "./genericService";
import _genericService from "./genericService";

const path = "truck-type";

function _truckTypeService() {
  return { ...genericService<RefTruckType>(path) };
}

export const truckTypeService = _truckTypeService();
