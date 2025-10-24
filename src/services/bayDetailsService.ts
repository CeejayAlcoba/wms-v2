import type { BayDetails } from "../@types/tables/BayDetails";
import genericService from "./genericService";

const path = "bay-details";

function _bayDetailsService() {
  return { ...genericService<BayDetails>(path) };
}

export const bayDetailsService = _bayDetailsService();
