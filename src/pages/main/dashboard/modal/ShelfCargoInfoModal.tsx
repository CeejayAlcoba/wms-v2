import { Modal, Form, type ModalProps, QRCode, type TableProps } from "antd";
import { useState } from "react";
import type { ShelfDetails } from "../../../../@types/tables/ShelfDetails";
import { useQuery } from "@tanstack/react-query";
import { reportService } from "../../../../services/reportService";
import TableComponent from "../../../../components/Table/TableComponent";
import type { ReportInventoryDTO } from "../../../../@types/DTOs/ReportInventoryDTO";
import { handleMoney } from "../../../../utils/handleMoney";
import dayjs from "dayjs";
import ShelfInfo from "./ShelfInfo";
import CargoHistoryTable from "../../inventory/CargoHistoryTable";
import type { ReportCargoHistoryDTO } from "../../../../@types/DTOs/ReportCargoHistoryDTO";

type ShelfCargoInfoModalProps = {
  open: boolean;
  onClose: () => void;
  shelfDetails: ShelfDetails | null;
  onSubmit: (values: any) => void;
  initialValues?: any;
} & ModalProps;

export default function ShelfCargoInfoModal({
  open,
  onClose,
  onSubmit,
  initialValues,
  shelfDetails,
  ...rest
}: ShelfCargoInfoModalProps) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [cargoHistories, setCargoHistories] = useState<ReportCargoHistoryDTO[]>(
    []
  );
  const { data: inventories, isFetching } = useQuery({
    queryKey: ["inventories", shelfDetails?.id],
    queryFn: async () => {
      if (shelfDetails?.id)
        return await reportService.InventoryGetAll({
          shelfDetailsId: shelfDetails?.id,
        });
      return [];
    },
    initialData: [],
  });
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      await onSubmit(values);
      form.resetFields();
      setLoading(false);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };
  const columns: TableProps<ReportInventoryDTO>["columns"] = [
    {
      title: "Actual Check-in Date",
      dataIndex: "actualCheckInDate",
      key: "actualCheckInDate",
      render: (value) => dayjs(value).format("YYYY-MM-DD"),
    },
    {
      title: "ICR",
      dataIndex: "icrReferenceNumber",
      key: "icrReferenceNumber",
    },
    {
      title: "DR",
      dataIndex: "drNumber",
      key: "drNumber",
    },
    {
      title: "SKU",
      dataIndex: "skuCode",
      key: "skuCode",
    },
    {
      title: "Principal",
      dataIndex: "principal",
      key: "principal",
    },
    {
      title: "Product Category",
      dataIndex: "productCategory",
      key: "productCategory",
    },

    {
      title: "Actual Pallete",
      dataIndex: "palleteCount",
      key: "palleteCount",
    },
    {
      title: "Balance Pallete",
      dataIndex: "balancePalleteCount",
      key: "balancePalleteCount",
    },
    {
      title: "Actual Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Balance Quantity",
      dataIndex: "balanceQuantity",
      key: "balanceQuantity",
    },
    {
      title: "Actual CBM",
      dataIndex: "cubicMeter",
      key: "cubicMeter",
    },
    {
      title: "Balance CBM",
      dataIndex: "balanceCubicMeter",
      key: "balanceCubicMeter",
    },
    {
      title: "Dimension (L×W×H)",
      key: "dimension",
      render: (_, record) => {
        const { lengthCm, widthCm, heightCm } = record;
        if (lengthCm && widthCm && heightCm) {
          return `${lengthCm} x ${widthCm} x ${heightCm} cm`;
        }
        return <span className="text-secondary">N/A</span>;
      },
    },
    {
      title: "Unit of Measurement",
      dataIndex: "unitOfMeasurement",
      key: "unitOfMeasurement",
    },

    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (value) => handleMoney(value),
    },
    {
      title: "GR",
      dataIndex: "goodsReceipt",
      key: "goodsReceipt",
    },
  ];
  const handleExpand = async (
    expanded: boolean,
    record: ReportInventoryDTO
  ) => {
    if (expanded) {
      const res = await reportService.CargoHistoryGetAll({
        id: record.id,
      });
      setCargoHistories((prev) => [...prev, ...res]);
    } else {
      const filteredCargo = cargoHistories.filter((c) => c.id !== record.id);
      setCargoHistories(filteredCargo);
    }
  };
  return (
    <Modal
      loading={isFetching}
      width={1500}
      title="Cargo Information"
      open={open}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      onOk={handleOk}
      confirmLoading={loading}
      okText="Save"
      cancelText="Cancel"
      {...rest}
    >
      <div className="row row-col-lg-2">
        <QRCode
          value={shelfDetails ? `${shelfDetails.id}-${shelfDetails.name}` : "-"}
        />
        <ShelfInfo shelfDetails={shelfDetails} />
      </div>
      <TableComponent<ReportInventoryDTO>
        columns={columns}
        dataSource={inventories}
        expandable={{
          expandedRowRender: (record) => (
            <CargoHistoryTable
              cargoHistories={cargoHistories}
              record={record}
            />
          ),
          onExpand: handleExpand,
        }}
      />
    </Modal>
  );
}
