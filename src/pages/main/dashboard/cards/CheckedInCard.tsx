import { ExportOutlined } from "@ant-design/icons";
import { Card, Modal, Statistic } from "antd";
import { useState } from "react";
import { EMPTY_FORM } from "../../inbound/__constants__/EMPTY_FORM";
import InboundTable from "../../inbound/InboundTable";
import type { ReportInboundFilterDTO } from "../../../../@types/DTOs/ReportInboundFilterDTO";

type CheckedInCardProps = {
  checkedIn: number;
  loading?: boolean;
};

export default function CheckedInCard({
  checkedIn,
  loading,
}: CheckedInCardProps) {
  const [modal, setModal] = useState<boolean>(false);
  const [search, setSearch] = useState<ReportInboundFilterDTO>({
    ...EMPTY_FORM,
    isStaging: false,
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
            title="Checked In"
            readonly
            search={search}
            setSearch={setSearch}
          />
        )}
      </Modal>

      <Card hoverable onClick={() => setModal(true)}>
        <Statistic
          loading={loading}
          title="Checked-In"
          value={checkedIn}
          prefix={<ExportOutlined />}
          valueStyle={{ color: "#13c2c2" }}
        />
      </Card>
    </>
  );
}
