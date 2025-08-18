import type { UserDTO } from "../@types/DTOs/UserDTO";
import type { Administrator } from "../@types/tables/Administrator";
import axiosInstance from "./axiosIntance";
import genericService from "./genericService";
import _genericService from "./genericService";
import objectToQueryParam from "./utilities/objectToQueryParam";

const path = "administrator";

function _userService() {
  const GetAll = async (filters?: Administrator) => {
    const queryParams = objectToQueryParam(filters);
    const { data } = await axiosInstance.get<UserDTO[]>(
      `${path}/list?${queryParams}`
    );
    return data;
  };

  const Approve = async (data: UserDTO) => {
    const { data: response } = await axiosInstance.put<Administrator>(
      `${path}/${data.id}/approve`,
      data
    );
    return response;
  };
  return { ...genericService<Administrator>(path), GetAll, Approve };
}

export const userService = _userService();
