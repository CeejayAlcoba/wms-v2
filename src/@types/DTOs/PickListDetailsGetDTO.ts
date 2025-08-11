import type { PickListDetails } from "../tables/PickListDetails";

export type PickListDetailsGetDTO = {
  ocr?: string;
  goodIssue?: number;
} & PickListDetails;
