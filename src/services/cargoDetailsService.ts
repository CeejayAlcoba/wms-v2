import type { CargoDetails } from "../@types/tables/CargoDetails";
import genericService from "./genericService";

const path = "cargo-details";

function _cargoDetailsService() {
  return { ...genericService<CargoDetails>(path) };
}

export const cargoDetailsService = _cargoDetailsService();
