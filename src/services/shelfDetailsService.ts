import type { ShelfDetails } from "../@types/tables/ShelfDetails";
import genericService from "./genericService";

const path = "shelf-details";

function _shelfDetailsService() {
  return { ...genericService<ShelfDetails>(path) };
}

export const shelfDetailsService = _shelfDetailsService();
