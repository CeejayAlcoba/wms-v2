import type { IPaginationTotal } from "../pagination/IPaginationTotal";
import type { PickListDetails } from "../tables/PickListDetails";

export type PickListDetailsGetDTO = {
  ocr?: string;
  goodIssue?: number;
  dofNumber?: string;
} & PickListDetails & IPaginationTotal;
