import type { MasterSidebarMenu } from "../tables/MasterSidebarMenu";
import type { SidebarMenuItemDTO } from "./SidebarMenuItemDTO";

export type SideBarMenuDTO = {
  antIcon: string;
  items: SidebarMenuItemDTO[];
} & MasterSidebarMenu;
