import type { TruckDetailsDTO } from "../@types/DTOs/TruckDetailsDTO";
import type { RefTruckDetails } from "../@types/tables/RefTruckDetails";
import axiosInstance from "./axiosIntance";
import genericService from "./genericService";
import _genericService from "./genericService";
import objectToQueryParam from "./utilities/objectToQueryParam";

const path = "truck-details";

function _truckDetailsService() {
  const GetAll = async (filters?: Partial<RefTruckDetails>) => {
    const queryParams = objectToQueryParam(filters);
    const { data } = await axiosInstance.get<TruckDetailsDTO[]>(
      `${path}/list?${queryParams}`
    );
    return data;
  };
  return { ...genericService<RefTruckDetails>(path), GetAll };
}

export const truckDetailsService = _truckDetailsService();
