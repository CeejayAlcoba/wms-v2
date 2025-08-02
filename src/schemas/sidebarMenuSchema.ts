import * as yup from "yup";
import { requiredMessage } from "./yupInitials";
import type { MasterSidebarMenu } from "../@types/tables/MasterSidebarMenu";

export const sidebarMenuSchema: yup.Schema<MasterSidebarMenu> = yup.object({
  name: yup.string().required(requiredMessage),
  antIconId: yup.number().notRequired(),
});
