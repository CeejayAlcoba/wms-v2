import type { MasterSidebarMenuItem } from "../tables/MasterSidebarMenuItem";
import type { RefRole } from "../tables/RefRole";

export type RoleDTO = {
  sidebarMenuItems: MasterSidebarMenuItem[];
} & RefRole;
