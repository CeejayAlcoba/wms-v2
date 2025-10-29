import type { IPaginationFilter } from "../pagination/IPaginationFilter";
import type { RackDetails } from "../tables/RackDetails";

export type RackDetailsFilterDTO = RackDetails & IPaginationFilter;
