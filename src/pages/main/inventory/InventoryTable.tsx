import { useQuery } from "@tanstack/react-query";
import type { ReportInventoryDTO } from "../../../@types/DTOs/ReportInventoryDTO";
import TableComponent from "../../../components/Table/TableComponent";
import usePage from "../../../hooks/usePage";
import { reportService } from "../../../services/reportService";
import type { ReportInventoryFilterDTO } from "../../../@types/DTOs/ReportInventoryFilterDTO";
import { useState } from "react";
import type { ReportCargoHistoryDTO } from "../../../@types/DTOs/ReportCargoHistoryDTO";
import { Button, Popconfirm, Tooltip, type TableProps } from "antd";
import dayjs from "dayjs";
import { handleMoney } from "../../../utils/handleMoney";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CargoHistoryTable from "./CargoHistoryTable";
import TableTotalFooter from "../../../components/Table/TableTotalFooter";
import { TABLE_TOTAL_FOOTER } from "../../../constants/TABLE_TOTAL_FOOTER";
import SaveModal from "./SaveModal";
import type { CargoDetails } from "../../../@types/tables/CargoDetails";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import { cargoDetailsService } from "../../../services/cargoDetailsService";

export type InventoryTableProps = {
  search: ReportInventoryFilterDTO;
  setSearch: React.Dispatch<React.SetStateAction<ReportInventoryFilterDTO>>;
  onClickEdit?: (record: ReportInventoryDTO) => void;
  onDelete?: (record: ReportInventoryDTO) => void;
  onAfterSave?: () => void;
};

export default function InventoryTable({
  search,
  setSearch,
}: InventoryTableProps) {
  const [cargoHistories, setCargoHistories] = useState<ReportCargoHistoryDTO[]>(
    []
  );
  const [selectedData, setSelectedData] = useState<CargoDetails | null>(null);
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const { title: pageTitle } = usePage();

  const {
    data: inventories,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["inventories", search],
    queryFn: async () => {
      return await reportService.InventoryGetAll(search);
    },
    initialData: [],
  });

  const handleExpand = async (
    expanded: boolean,
    record: ReportInventoryDTO
  ) => {
    if (expanded) {
      const res = await reportService.CargoHistoryGetAll({
        actualCheckInDateFrom: search.actualCheckInDateFrom,
        actualCheckInDateTo: search.actualCheckInDateTo,
        id: record.id,
      });
      setCargoHistories((prev) => [...prev, ...res]);
    } else {
      const filteredCargo = cargoHistories.filter((c) => c.id !== record.id);
      setCargoHistories(filteredCargo);
    }
  };

  const handlePaginate = (page: number, pageSize: number) => {
    setSearch((prev) => ({ ...prev, currentPage: page, pageSize }));
  };
  const handleAfterSave = () => {
    setSelectedData(null);
    setSaveModalOpen(false);
    refetch();
  };

  const handleClickCancel = () => {
    setSelectedData(null);
    setSaveModalOpen(false);
  };

  const handleUnpaginate = async () => {
    await setSearch((prev) => ({
      ...prev,
      currentPage: null,
      pageSize: null,
    }));
    await refetch();
  };

  const handleDelete = async (record: ReportInventoryDTO) => {
    if (!record.id) throw new Error("Id is null");
    await cargoDetailsService.Delete(record.id);
    SweetAlert({
      title: "Successfully deleted.",
    });
  };
  const handleClickEdit = (record: ReportInventoryDTO) => {
    setSelectedData(record);
    setSaveModalOpen(true);
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
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "BIN Loc",
      dataIndex: "binLocation",
      key: "binLocation",
    },
    {
      title: "Balance PLT",
      dataIndex: "balancePalleteCount",
      key: "balancePalleteCount",
    },
    {
      title: "Balance QTY",
      dataIndex: "balanceQuantity",
      key: "balanceQuantity",
    },
    {
      title: "Uom",
      dataIndex: "unitOfMeasurement",
      key: "unitOfMeasurement",
     
    },
    {
      title: "Balance CBM",
      dataIndex: "balanceCubicMeter",
      key: "balanceCubicMeter",
    },
    {
      title: "Dimension",
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
    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (_, record) => (
        <div className="d-flex gap-1">
          <Tooltip title="Edit">
            <Button
              color="primary"
              shape="circle"
              variant="solid"
              icon={<EditOutlined />}
              onClick={() => handleClickEdit(record)}
            />
          </Tooltip>

          <Popconfirm
            title="Are you sure to delete this item?"
            onConfirm={() => handleDelete(record)}
            onCancel={() => console.log("Cancelled")}
            okText="Yes"
            cancelText="No"
          >
            <Button
              color="danger"
              shape="circle"
              variant="solid"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <SaveModal
        open={saveModalOpen}
        onAfterSave={handleAfterSave}
        onCancel={handleClickCancel}
        selectedData={selectedData}
      />
      <TableComponent<ReportInventoryDTO>
        rowKey="id"
        headerTitle={pageTitle}
        columns={columns}
        dataSource={inventories}
        loading={isFetching}
        print={{ onBeforePrint: async () => await handleUnpaginate() }}
        pdf={{ onChange: async () => await handleUnpaginate() }}
        pagination={{
          total: inventories?.[0]?.totalItems,
          onChange: handlePaginate,
        }}
        expandable={{
          expandedRowRender: (record) => (
            <CargoHistoryTable
              cargoHistories={cargoHistories}
              record={record}
            />
          ),
          onExpand: handleExpand,
        }}
        footer={() => (
          <TableTotalFooter<ReportInventoryDTO>
            data={inventories}
            values={TABLE_TOTAL_FOOTER}
          />
        )}
      />
    </>
  );
}
