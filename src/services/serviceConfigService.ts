import type { ServiceConfigDTO } from "../@types/DTOs/ServiceConfigDTO";
import type { RefServiceConfig } from "../@types/tables/RefServiceConfig";
import axiosInstance from "./axiosIntance";
import genericService from "./genericService";

const path = "service-config";

function _serviceConfigService() {
  const GetById = async (id: number) => {
    const { data } = await axiosInstance.get<ServiceConfigDTO>(`${path}/${id}`);
    return data;
  };

  const Update = async (id: number, data: ServiceConfigDTO) => {
    const { data: reponseData } = await axiosInstance.patch<RefServiceConfig>(
      `${path}/${id}`,
      data
    );
    return reponseData;
  };
  const Add = async (data: ServiceConfigDTO) => {
    const { data: reponseData } = await axiosInstance.post<RefServiceConfig>(
      path,
      data
    );
    return reponseData;
  };
  return {
    ...genericService<RefServiceConfig>(path),
    GetById,
    Update,
    Add,
  };
}

export const serviceConfigService = _serviceConfigService();
