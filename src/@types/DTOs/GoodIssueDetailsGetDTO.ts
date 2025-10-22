import type { IPaginationTotal } from "../pagination/IPaginationTotal";
import type { GoodIssueDetails } from "../tables/GoodIssueDetails";

export type GoodIssueDetailsGetDTO = GoodIssueDetails & IPaginationTotal;
