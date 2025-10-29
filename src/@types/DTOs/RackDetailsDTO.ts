import type { IPaginationTotal } from "../pagination/IPaginationTotal";
import type { RackDetails } from "../tables/RackDetails";
import type { BayDetailsGetDTO } from "./BayDetailsGetDTO";

export type RackDetailsDTO = {
  bayDetails: BayDetailsGetDTO[];
} & RackDetails &
  IPaginationTotal;
