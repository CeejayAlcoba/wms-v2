import type { ChangePasswordDTO } from "../@types/DTOs/ChangePasswordDTO";
import type { LoginResponseDTO } from "../@types/DTOs/LoginReponseDTO";
import type { ProfileDTO } from "../@types/DTOs/ProfileDTO";
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

  const GetProfile = async (password: string) => {
    const { data } = await axiosInstance.post<ProfileDTO>(
      `${path}/profile/get`,
      {
        password,
      }
    );

    return data;
  };

  const UpdateProfile = async (value: ProfileDTO) => {
    const { data } = await axiosInstance.post<LoginResponseDTO>(
      `${path}/profile/update`,
      value
    );

    return data;
  };
  const ChangePassword = async (value: ChangePasswordDTO) => {
    const { data } = await axiosInstance.post<LoginResponseDTO>(
      `${path}/profile/change-password`,
      value
    );

    return data;
  };

  return {
    Sidebar,
    SidebarMenuItems,
    GetProfile,
    UpdateProfile,
    ChangePassword,
  };
}

export const meService = _meService();
