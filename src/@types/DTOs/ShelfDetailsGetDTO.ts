import type { IPaginationTotal } from "../pagination/IPaginationTotal";
import type { ShelfDetails } from "../tables/ShelfDetails";

export type ShelfDetailsGetDTO = ShelfDetails & IPaginationTotal;
