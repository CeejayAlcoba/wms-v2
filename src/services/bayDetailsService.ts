import type { BayDetailsGetDTO } from "../@types/DTOs/BayDetailsGetDTO";
import type { BayDetails } from "../@types/tables/BayDetails";
import axiosInstance from "./axiosIntance";
import genericService from "./genericService";
import objectToQueryParam from "./utilities/objectToQueryParam";

const path = "bay-details";

function _bayDetailsService() {
  return { ...genericService<BayDetails>(path) };
}

export const bayDetailsService = _bayDetailsService();
