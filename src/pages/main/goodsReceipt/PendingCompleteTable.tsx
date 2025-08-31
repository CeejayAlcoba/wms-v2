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
import type { BookingDetailsFilterDTO } from "../../../@types/DTOs/BookingDetailsFilterDTO";

export default function PendingCompleteTable(props: {
  search: BookingDetailsFilterDTO;
  setSearch: React.Dispatch<React.SetStateAction<BookingDetailsFilterDTO>>;
  bookingDetails: BookingDetailsDTO[];
  refetch: () => void;
  isFetching: boolean;
  activeKey: TabKey;
}) {
  const { bookingDetails, search, setSearch, refetch, isFetching, activeKey } =
    props;
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<BookingDetailsDTO | null>(
    null
  );

  const [cargoDetails, setCargoDetails] = useState<CargoDetails[]>([]);

  const handleClickAdd = (record: BookingDetailsDTO) => {
    setSelectedData(record);
    setSaveModalOpen(true);
  };

  const handleClicEdit = (record: BookingDetailsDTO) => {
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

  const handleExpand = async (expanded: boolean, record: BookingDetailsDTO) => {
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

  const handlePaginate = (page: number, pageSize: number) => {
    setSearch((prev) => ({ ...prev, currentPage: page, pageSize }));
  };

  const handleUnpaginate = async () => {
    await setSearch((prev) => ({
      ...prev,
      currentPage: null,
      pageSize: null,
    }));
    await refetch();
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
      <TableComponent<BookingDetailsDTO>
        rowKey={(data: BookingDetailsDTO) => data.id ?? 0}
        print={{ onBeforePrint: async () => await handleUnpaginate() }}
        pdf={{ onChange: async () => await handleUnpaginate() }}
        pagination={{
          total: bookingDetails?.[0]?.totalItems,
          onChange: handlePaginate,
          current: search.currentPage ?? 1,
          pageSize: search.pageSize ?? 10,
        }}
        expandable={{
          expandedRowRender: (record) => (
            <CargoDetailTable cargoDetails={cargoDetails} record={record} />
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
