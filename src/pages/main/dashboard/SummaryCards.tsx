import { useState } from "react";
import { Card, Statistic } from "antd";
import {
  InboxOutlined,
  ExportOutlined,
  CheckCircleOutlined,
  RetweetOutlined,
  ArrowUpOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import type { DashboardSummaryDTO } from "../../../@types/DTOs/DashboardSummaryDTO";
import InboundStagingCard from "./cards/InboundStagingCard";
import OutboundStagingCard from "./cards/OutboundStagingCard";
import CheckedInCard from "./cards/CheckedInCard";
import ReturnedCard from "./cards/ReturnedCard";
import PullOutCard from "./cards/PullOutCard";
import ShelfSummaryCard from "./cards/ShelfSummaryCard";
import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../../../services/dashboardService";

export default function SummaryCards() {
  const { data: summaries, isFetching } = useQuery({
    queryKey: ["summaries"],
    queryFn: async () => await dashboardService.GetSummary(),
    initialData: {
      returned: 12,
      checkedIn: 45,
      pullOut: 8,
      inboundStaging: 23,
      outboundStaging: 10,
      shelf: {
        occupied: 120,
        empty: 30,
      },
    },
  });

  return (
    <div>
      <div className="row g-3 row-cols-lg-3">
        <div className="col">
          <InboundStagingCard
            inboundStaging={summaries.inboundStaging}
            loading={isFetching}
          />
        </div>

        {/* Outbound Staging */}
        <div className="col">
          <OutboundStagingCard
            outboundStaging={summaries.outboundStaging}
            loading={isFetching}
          />
        </div>

        {/* Checked-In */}
        <div className="col">
          <CheckedInCard checkedIn={summaries.checkedIn} loading={isFetching} />
        </div>
        <div className="col">
          <ReturnedCard returned={summaries.returned} loading={isFetching} />
        </div>

        {/* Pull-Out */}
        <div className="col">
          <PullOutCard pullOut={summaries.pullOut} loading={isFetching} />
        </div>

        <div className="col">
          <ShelfSummaryCard shelf={summaries.shelf} loading={isFetching} />
        </div>
      </div>
    </div>
  );
}
