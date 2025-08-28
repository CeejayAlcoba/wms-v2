import type { RefServiceConfig } from "../@types/tables/RefServiceConfig";
import type { RefServiceField } from "../@types/tables/RefServiceField";
import axiosInstance from "./axiosIntance";
import genericService from "./genericService";

const path = "service-field";

function _serviceFieldService() {
  const GetByServiceConfigId = async (id: number) => {
    const { data } = await axiosInstance.get<RefServiceConfig[]>(
      `${path}/service-config/${id}`
    );
    return data;
  };
  return { ...genericService<RefServiceField>(path), GetByServiceConfigId };
}

export const serviceFieldService = _serviceFieldService();
