import type { SideBarMenuDTO } from "../@types/DTOs/SideBarMenuDTO";
import type { MasterSidebarMenuItem } from "../@types/tables/MasterSidebarMenuItem";
import axiosInstance from "./axiosIntance";

const path = "me";

function _meService() {
  const Sidebar = async () => {
    const { data } = await axiosInstance.get<SideBarMenuDTO[]>(
      `${path}/sidebar`
    );
    return data;
  };
  const SidebarMenuItems = async () => {
    const { data } = await axiosInstance.get<SideBarMenuDTO[]>(
      `${path}/sidebar`
    );

    let menuItems: MasterSidebarMenuItem[] = [];
    data.map((d) => {
      menuItems = [...menuItems, ...d.items];
    });
    return menuItems;
  };

  return { Sidebar, SidebarMenuItems };
}

export const meService = _meService();
