import type { PickListDetailsRecordFilterDTO } from "../@types/DTOs/PickListDetailsRecordFilterDTO";
import type { PickListDetailsRecordGetDTO } from "../@types/DTOs/PickListDetailsRecordGetDTO";
import axiosInstance from "./axiosIntance";
import objectToQueryParam from "./utilities/objectToQueryParam";

const path = "pick-list-details-record";

function _pickListDetailsRecordService() {
  const GetAll = async (filters?: PickListDetailsRecordFilterDTO) => {
    const queryParams = objectToQueryParam(filters);
    const { data } = await axiosInstance.get<PickListDetailsRecordGetDTO[]>(
      `${path}/list?${queryParams}`
    );
    return data;
  };

  return { GetAll };
}

export const pickListDetailsRecordService = _pickListDetailsRecordService();
