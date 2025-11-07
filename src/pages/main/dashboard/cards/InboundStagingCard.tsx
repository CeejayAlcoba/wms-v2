import { InboxOutlined } from "@ant-design/icons";
import { Card, Modal, Statistic } from "antd";
import { useState } from "react";
import type { ReportInboundFilterDTO } from "../../../../@types/DTOs/ReportInboundFilterDTO";
import { EMPTY_FORM } from "../../inbound/__constants__/EMPTY_FORM";
import InboundTable from "../../inbound/InboundTable";

type InboundStagingCardProps = {
  inboundStaging: number;
  loading?: boolean;
};

export default function InboundStagingCard({
  inboundStaging,
  loading,
}: InboundStagingCardProps) {
  const [modal, setModal] = useState<boolean>(false);
  const [search, setSearch] = useState<ReportInboundFilterDTO>({
    ...EMPTY_FORM,
    isStaging: true,
  });
  return (
    <>
      <Modal
        open={modal}
        onCancel={() => setModal(false)}
        width={1500}
        onOk={() => setModal(false)}
      >
        {modal && (
          <InboundTable
            readonly
            title="Inbound Staging"
            search={search}
            setSearch={setSearch}
          />
        )}
      </Modal>
      <Card hoverable onClick={() => setModal(true)}>
        <Statistic
          loading={loading}
          title="Inbound Staging"
          value={inboundStaging}
          prefix={<InboxOutlined />}
          valueStyle={{ color: "#1677ff" }}
        />
      </Card>
    </>
  );
}
