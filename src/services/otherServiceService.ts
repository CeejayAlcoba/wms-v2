import type { OtherServiceDTO } from "../@types/DTOs/OtherServiceDTO";
import type { RefOtherService } from "../@types/tables/RefOtherService";
import axiosInstance from "./axiosIntance";
import genericService from "./genericService";

const path = "other-service";

function _otherServiceService() {
  const GetById = async (id: number) => {
    const { data } = await axiosInstance.get<OtherServiceDTO>(`${path}/${id}`);
    return data;
  };

  const Update = async (id: number, data: OtherServiceDTO) => {
    const { data: reponseData } = await axiosInstance.patch<RefOtherService>(
      `${path}/${id}`,
      data
    );
    return reponseData;
  };
  const Add = async (data: OtherServiceDTO) => {
    const { data: reponseData } = await axiosInstance.post<RefOtherService>(
      path,
      data
    );
    return reponseData;
  };
  return {
    ...genericService<RefOtherService>(path),
    GetById,
    Update,
    Add,
  };
}

export const otherServiceService = _otherServiceService();
