import type { RoleDTO } from "../@types/DTOs/RoleDTO";
import type { RefRole } from "../@types/tables/RefRole";
import axiosInstance from "./axiosIntance";
import genericService from "./genericService";
import objectToQueryParam from "./utilities/objectToQueryParam";

const path = "role";

function _roleService() {
  const GetAll = async (filters?: RefRole) => {
    const queryParams = objectToQueryParam(filters);
    const { data } = await axiosInstance.get<RoleDTO[]>(
      `${path}/list?${queryParams}`
    );
    return data;
  };

  const GetAllWithSidebar = async (filters: RefRole) => {
    const queryParams = objectToQueryParam(filters);
    const { data } = await axiosInstance.get<RoleDTO[]>(
      `${path}/sidebar/list?${queryParams}`
    );
    return data;
  };
  return { ...genericService<RefRole>(path),GetAll,GetAllWithSidebar };
}

export const roleService = _roleService();
