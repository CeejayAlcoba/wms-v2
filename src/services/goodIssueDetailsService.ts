import type { GoodIssueDetails } from "../@types/tables/GoodIssueDetails";
import genericService from "./genericService";

const path = "good-issue-details";

function _goodIssueDetailsService() {
  return { ...genericService<GoodIssueDetails>(path) };
}

export const goodIssueDetailsService = _goodIssueDetailsService();
