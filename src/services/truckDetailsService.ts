import type { RefTruckDetails } from "../@types/tables/RefTruckDetails";
import genericService from "./genericService";
import _genericService from "./genericService";

const path = "truck-details";

function _truckDetailsService() {
  return { ...genericService<RefTruckDetails>(path) };
}

export const truckDetailsService = _truckDetailsService();
