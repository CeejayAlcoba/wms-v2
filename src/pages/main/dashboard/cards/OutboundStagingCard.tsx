import { ExportOutlined, InboxOutlined } from "@ant-design/icons";
import { Card, Statistic } from "antd";

type OutboundStagingCardProps = {
  outboundStaging: number;
  loading?: boolean;
};

export default function OutboundStagingCard({
  outboundStaging,
  loading,
}: OutboundStagingCardProps) {
  return (
    <Card hoverable>
      <Statistic
        loading={loading}
        title="Outbound Staging"
        value={outboundStaging}
        prefix={<ExportOutlined />}
        valueStyle={{ color: "#13c2c2" }}
      />
    </Card>
  );
}
