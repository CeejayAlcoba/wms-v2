import { ExportOutlined } from "@ant-design/icons";
import { Card, Modal, Statistic } from "antd";
import OutboundTable from "../../outbound/OutboundTable";
import { useState } from "react";
import type { ReportOutboundFilterDTO } from "../../../../@types/DTOs/ReportOutboundFilterDTO";
import { EMPTY_FORM } from "../../outbound/__constants__/EMPTY_FORM";

type OutboundStagingCardProps = {
  outboundStaging: number;
  loading?: boolean;
};

export default function OutboundStagingCard({
  outboundStaging,
  loading,
}: OutboundStagingCardProps) {
  const [modal, setModal] = useState<boolean>(false);
  const [search, setSearch] = useState<ReportOutboundFilterDTO>({
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
          title="Outbound Staging"
          value={outboundStaging}
          prefix={<ExportOutlined />}
          valueStyle={{ color: "#13c2c2" }}
        />
      </Card>
    </>
  );
}
