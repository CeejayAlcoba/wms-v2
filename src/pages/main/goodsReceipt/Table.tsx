import { Button, Tooltip, type TableProps } from "antd";
import type { BookingDetails } from "../../../@types/tables/BookingDetails";
import { useState } from "react";
import { CheckCircleOutlined, EditOutlined } from "@ant-design/icons";
import TableComponent from "../../../components/Table/TableComponent";
import type { BookingDetailsDTO } from "../../../@types/DTOs/BookingDetailsDTO";
import type { CargoDetails } from "../../../@types/tables/CargoDetails";
import { cargoDetailsService } from "../../../services/cargoDetailsService";
import CargoDetailTable from "./CargoDetailTable";
import { INITIAL_COLUMNS } from "./__constants__/INITIAL_COLUMNS";
import type { TabKey } from "./IndexPage";
import SaveModal from "./SaveModal";

export default function Table(props: {
  bookingDetails: BookingDetailsDTO[];
  refetch: () => void;
  isFetching: boolean;
  activeKey: TabKey;
}) {
  const { bookingDetails, refetch, isFetching, activeKey } = props;
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<BookingDetails | null>(null);

  const [cargoDetails, setCargoDetails] = useState<CargoDetails[]>([]);

  const handleClickAdd = (record: BookingDetails) => {
    setSelectedData(record);
    setSaveModalOpen(true);
  };

  const handleClicEdit = (record: BookingDetails) => {
    setSelectedData(record);
    setSaveModalOpen(true);
  };

  const handleClickCancel = () => {
    setSelectedData(null);
    setSaveModalOpen(false);
  };

  const handleAfterSave = () => {
    setSelectedData(null);
    setSaveModalOpen(false);
    refetch();
  };

  const handleExpand = async (expanded: boolean, record: BookingDetails) => {
    if (expanded) {
      const res = await cargoDetailsService.GetAll({
        bookingDetailsId: record.id,
      });
      setCargoDetails((prev) => [...prev, ...res]);
    } else {
      const filteredCargo = cargoDetails.filter(
        (c) => c.bookingDetailsId !== record.id
      );
      setCargoDetails(filteredCargo);
    }
  };

  const pendingColumns: TableProps<BookingDetailsDTO>["columns"] = [
    ...(INITIAL_COLUMNS ?? []),
    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (_, record) => (
        <div className="d-flex gap-1">
          <Tooltip title="Add Good Receipt">
            <Button
              color="primary"
              shape="circle"
              variant="solid"
              icon={<CheckCircleOutlined />}
              onClick={() => handleClickAdd(record)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const completedColumns: TableProps<BookingDetailsDTO>["columns"] = [
    {
      title: "GR",
      dataIndex: "goodsReceipt",
      key: "goodsReceipt",
    },
    ...(INITIAL_COLUMNS ?? []),
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
              onClick={() => handleClicEdit(record)}
            />
          </Tooltip>
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
        activeKey={activeKey}
      />
      <TableComponent<BookingDetails>
        rowKey={(data: BookingDetails) => data.id ?? 0}
        expandable={{
          expandedRowRender: (record) => (
            <CargoDetailTable
              cargoDetails={cargoDetails.filter(
                (c) => c.bookingDetailsId == record.id
              )}
            />
          ),
          onExpand: handleExpand,
        }}
        headerTitle={`${
          activeKey == "Completed" ? "Completed" : "Pending"
        }  Good Receipt`}
        columns={activeKey == "Completed" ? completedColumns : pendingColumns}
        dataSource={bookingDetails}
        loading={isFetching}
      />
    </>
  );
}
