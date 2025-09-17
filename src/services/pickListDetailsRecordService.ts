import type { PickListDetailsRecordFilterDTO } from "../@types/DTOs/PickListDetailsRecordFilterDTO";
import type { PickListDetailsRecordGetDTO } from "../@types/DTOs/PickListDetailsRecordGetDTO";
import type { PickListDetailsRecord } from "../@types/tables/PickListDetailsRecord";
import axiosInstance from "./axiosIntance";
import genericService from "./genericService";
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

  return { ...genericService<PickListDetailsRecord>(path), GetAll };
}

export const pickListDetailsRecordService = _pickListDetailsRecordService();
