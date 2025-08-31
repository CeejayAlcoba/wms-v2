import type { IPaginationFilter } from "../pagination/IPaginationFilter";
import type { PickListDetails } from "../tables/PickListDetails";

export type PickListDetailsFilterDTO = {
  goodIssueId?: number;
  isNullGoodIssue?: boolean;
} & PickListDetails & IPaginationFilter;
