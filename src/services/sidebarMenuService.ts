import type { MasterSidebarMenu } from "../@types/tables/MasterSidebarMenu";
import genericService from "./genericService";
import _genericService from "./genericService";

const path = "master-sidebar-menu";

function _sidebarMenuService() {
  return { ...genericService<MasterSidebarMenu>(path) };
}

export const sidebarMenuService = _sidebarMenuService();
