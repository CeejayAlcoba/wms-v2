import { RetweetOutlined } from "@ant-design/icons";
import { Card, Statistic } from "antd";

type ReturnedCardProps = {
  returned: number;
  loading?: boolean;
};

export default function ReturnedCard({ returned, loading }: ReturnedCardProps) {
  return (
    <Card hoverable>
      <Statistic
        loading={loading}
        title="Returned"
        value={returned}
        prefix={<RetweetOutlined />}
        valueStyle={{ color: "#722ed1" }}
      />
    </Card>
  );
}
