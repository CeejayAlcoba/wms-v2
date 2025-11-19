import type { IPaginationFilter } from "../pagination/IPaginationFilter";
import type { ShelfDetails } from "../tables/ShelfDetails";

export type ShelfDetailsFilterDTO = {
  principalId?: number | null;
} & ShelfDetails &
  IPaginationFilter;
