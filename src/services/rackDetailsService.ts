import type { RackDetailsDTO } from "../@types/DTOs/RackDetailsDTO";
import type { RackDetails } from "../@types/tables/RackDetails";
import axiosInstance from "./axiosIntance";
import genericService from "./genericService";
import objectToQueryParam from "./utilities/objectToQueryParam";

const path = "rack-details";

function _rackDetailsService() {
  const GetAll = async (filters?: Partial<RackDetails>) => {
    const queryParams = objectToQueryParam(filters);
    const { data } = await axiosInstance.get<RackDetailsDTO[]>(
      `${path}/list?${queryParams}`
    );
    return data;
  };

  const Add = async (data: RackDetailsDTO) => {
    const { data: reponseData } = await axiosInstance.post<RackDetailsDTO>(
      path,
      data
    );
    return reponseData;
  };

  const UpdateRackOnly = async (id: number | undefined, data: RackDetails) => {
    const { data: reponseData } = await axiosInstance.put<RackDetailsDTO>(
      `${path}/${id}`,
      data
    );
    return reponseData;
  };

  const Update = async (id: number | undefined, data: RackDetailsDTO) => {
    const { data: reponseData } = await axiosInstance.patch<RackDetailsDTO>(
      `${path}/${id}`,
      data
    );
    return reponseData;
  };

  return {
    ...genericService<RackDetails>(path),
    GetAll,
    Add,
    Update,
    UpdateRackOnly,
  };
}

export const rackDetailsService = _rackDetailsService();
