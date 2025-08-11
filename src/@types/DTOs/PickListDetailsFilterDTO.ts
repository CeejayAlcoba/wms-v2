import type { PickListDetails } from "../tables/PickListDetails";

export type PickListDetailsFilterDTO = {
  goodIssueId?: number;
  isNullGoodIssue?: boolean;
} & PickListDetails;
