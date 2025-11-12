import { ArrowUpOutlined } from "@ant-design/icons";
import { Card, Modal, Statistic } from "antd";
import { EMPTY_FORM } from "../../outbound/__constants__/EMPTY_FORM";
import { useState } from "react";
import type { ReportOutboundFilterDTO } from "../../../../@types/DTOs/ReportOutboundFilterDTO";
import OutboundTable from "../../outbound/OutboundTable";

type PullOutCardProps = {
  pullOut: number;
  loading?: boolean;
};

export default function PullOutCard({ pullOut, loading }: PullOutCardProps) {
  const [modal, setModal] = useState<boolean>(false);
  const [search, setSearch] = useState<ReportOutboundFilterDTO>(EMPTY_FORM);
  return (
    <>
      <Modal
        open={modal}
        onCancel={() => setModal(false)}
        width={1500}
        onOk={() => setModal(false)}
      >
        {modal && (
          <OutboundTable
            title="Outbound Staging"
            search={search}
            setSearch={setSearch}
          />
        )}
      </Modal>
      <Card hoverable onClick={() => setModal(true)}>
        <Statistic
          loading={loading}
          title="Pull-Out"
          value={pullOut}
          prefix={<ArrowUpOutlined />}
          valueStyle={{ color: "#fa8c16" }}
        />
      </Card>
    </>
  );
}
