import type { DashboardShelfDetailsSummaryGetDTO } from "./DashboardShelfDetailsSummaryGetDTO";

export type DashboardSummaryDTO = {
  returned: number;
  checkedIn: number;
  pullOut: number;
  inboundStaging: number;
  outboundStaging: number;
  shelf: DashboardShelfDetailsSummaryGetDTO;
};
