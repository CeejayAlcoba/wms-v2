import type { RefCargoType } from "../@types/tables/RefCargoType";
import genericService from "./genericService";

const path = "cargo-type";

function _cargoTypeService() {
  return { ...genericService<RefCargoType>(path) };
}

export const cargoTypeService = _cargoTypeService();
