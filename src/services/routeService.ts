import type { SidebarMenuItemDTO } from "../@types/DTOs/SidebarMenuItemDTO";
import axiosInstance from "./axiosIntance";

const path = "route";

function _routeService() {
  const GetAll = async () => {
    const { data } = await axiosInstance.get<SidebarMenuItemDTO[]>(
      `${path}/list`
    );
    return data;
  };
  return { GetAll };
}

export const routeService = _routeService();
