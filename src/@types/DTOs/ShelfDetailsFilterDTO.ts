import type { IPaginationFilter } from "../pagination/IPaginationFilter";
import type { ShelfDetails } from "../tables/ShelfDetails";

export type ShelfDetailsFilterDTO = ShelfDetails & IPaginationFilter;
