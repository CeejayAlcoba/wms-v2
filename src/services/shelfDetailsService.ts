import type { ShelfDetailsFilterDTO } from "../@types/DTOs/ShelfDetailsFilterDTO";
import type { ShelfDetailsGetDTO } from "../@types/DTOs/ShelfDetailsGetDTO";
import type { ShelfDetails } from "../@types/tables/ShelfDetails";
import axiosInstance from "./axiosIntance";
import genericService from "./genericService";
import objectToQueryParam from "./utilities/objectToQueryParam";

const path = "shelf-details";

function _shelfDetailsService() {
  const GetAll = async (filters?: Partial<ShelfDetailsFilterDTO>) => {
    const queryParams = objectToQueryParam(filters);
    const { data } = await axiosInstance.get<ShelfDetailsGetDTO[]>(
      `${path}/list?${queryParams}`
    );
    return data;
  };
  return { ...genericService<ShelfDetails>(path), GetAll };
}

export const shelfDetailsService = _shelfDetailsService();
