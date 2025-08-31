import type { PickListDetailsDTO } from "../@types/DTOs/PickListDetailsDTO";
import type { PickListDetailsFilterDTO } from "../@types/DTOs/PickListDetailsFilterDTO";
import type { PickListDetailsGetDTO } from "../@types/DTOs/PickListDetailsGetDTO";
import type { PickListDetails } from "../@types/tables/PickListDetails";
import axiosInstance from "./axiosIntance";
import genericService from "./genericService";
import objectToQueryParam from "./utilities/objectToQueryParam";

const path = "pick-list-details";

function _pickListDetailsService() {
  const GetAll = async (filters?: Partial<PickListDetailsFilterDTO> ) => {
    const queryParams = objectToQueryParam(filters);
    const { data } = await axiosInstance.get<PickListDetailsGetDTO[]>(
      `${path}/list?${queryParams}`
    );
    return data;
  };
  const Add = async (data: PickListDetailsDTO) => {
    const { data: response } = await axiosInstance.post<PickListDetails>(
      path,
      data
    );
    return response;
  };

  return { ...genericService<PickListDetails>(path), Add, GetAll };
}

export const pickListDetailsService = _pickListDetailsService();
