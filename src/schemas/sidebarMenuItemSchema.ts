import * as yup from "yup";
import { requiredMessage } from "./yupInitials";
import type { MasterSidebarMenuItem } from "../@types/tables/MasterSidebarMenuItem";

export const sidebarMenuItemSchema: yup.Schema<MasterSidebarMenuItem> =
  yup.object({
    name: yup.string().required(requiredMessage),
    antIconId: yup.number().notRequired(),
    sidebarMenuId: yup.number().notRequired().nullable(),
    keyName: yup.string().required(requiredMessage),
    path: yup.string().required(requiredMessage),
    isVisible: yup.bool().required(requiredMessage),
    isAccessibleToAnyRole: yup.bool().required(requiredMessage),
  });
