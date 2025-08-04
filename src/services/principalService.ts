import type { PrincipalDTO } from "../@types/DTOs/PrincipalDTO";
import type { RefPrincipal } from "../@types/tables/RefPrincipal";
import axiosInstance from "./axiosIntance";
import genericService from "./genericService";
import objectToQueryParam from "./utilities/objectToQueryParam";

const path = "principal";

function _principalService() {
  const GetAll = async (filters?: RefPrincipal) => {
    const queryParams = objectToQueryParam(filters);
    const { data } = await axiosInstance.get<PrincipalDTO[]>(
      `${path}/list?${queryParams}`
    );
    return data;
  };
  return { ...genericService<RefPrincipal>(path), GetAll };
}

export const principalService = _principalService();
