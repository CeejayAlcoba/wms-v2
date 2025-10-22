import type { IPaginationFilter } from "../pagination/IPaginationFilter";
import type { GoodIssueDetails } from "../tables/GoodIssueDetails";

export type GoodIssueDetailsFilterDTO = GoodIssueDetails & IPaginationFilter;
