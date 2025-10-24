import type { BayDetails } from "../tables/BayDetails";
import type { ShelfDetails } from "../tables/ShelfDetails";

export type BayDetailsGetDTO = {
  shelfDetails: ShelfDetails[];
} & BayDetails;
