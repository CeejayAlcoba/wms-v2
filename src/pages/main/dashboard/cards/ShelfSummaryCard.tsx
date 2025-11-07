import { AppstoreOutlined } from "@ant-design/icons";
import { Card, Statistic } from "antd";
import type { DashboardShelfDetailsSummaryGetDTO } from "../../../../@types/DTOs/DashboardShelfDetailsSummaryGetDTO";

type ShelfSummaryCardProps = {
  shelf: DashboardShelfDetailsSummaryGetDTO;
  loading?: boolean;
};

export default function ShelfSummaryCard({
  shelf,
  loading,
}: ShelfSummaryCardProps) {
  return (
    <Card hoverable>
      <div className="d-flex justify-content-between align-items-center">
        <Statistic
          loading={loading}
          title="Occupied Shelf"
          value={shelf.occupied}
          prefix={<AppstoreOutlined />}
          valueStyle={{ color: "#cf1322" }}
        />
        <Statistic
          loading={loading}
          title="Empty Shelf"
          value={shelf.empty}
          prefix={<AppstoreOutlined />}
          valueStyle={{ color: "#389e0d" }}
        />
      </div>
    </Card>
  );
}
