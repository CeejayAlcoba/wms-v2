import type { MasterSidebarMenuItem } from "../@types/tables/MasterSidebarMenuItem";
import genericService from "./genericService";
import _genericService from "./genericService";

const path = "master-sidebar-menu-item";

function _sidebarMenuItemService() {
  return { ...genericService<MasterSidebarMenuItem>(path) };
}

export const sidebarMenuItemService = _sidebarMenuItemService();
