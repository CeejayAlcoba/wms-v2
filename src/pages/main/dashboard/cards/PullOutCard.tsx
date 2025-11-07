import { AppstoreOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Statistic } from "antd";
import type { DashboardShelfDetailsSummaryGetDTO } from "../../../../@types/DTOs/DashboardShelfDetailsSummaryGetDTO";

type PullOutCardProps = {
  pullOut: number;
  loading?: boolean;
};

export default function PullOutCard({ pullOut, loading }: PullOutCardProps) {
  return (
    <Card hoverable>
      <Statistic
        loading={loading}
        title="Pull-Out"
        value={pullOut}
        prefix={<ArrowUpOutlined />}
        valueStyle={{ color: "#fa8c16" }}
      />
    </Card>
  );
}
