import { Button, Popconfirm, Tooltip, type TableProps } from "antd";
import type { RefTruckDetails } from "../../../@types/tables/RefTruckDetails";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import TableComponent from "../../../components/Table/TableComponent";
import usePage from "../../../hooks/usePage";
import FilterCard from "./FilterCard";
import { truckDetailsService } from "../../../services/truckDetailsService";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import SaveModal from "./SaveModal";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import type { TruckDetailsDTO } from "../../../@types/DTOs/TruckDetailsDTO";

export default function IndexPage() {
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<RefTruckDetails | null>(
    null
  );
  const [search, setSearch] = useState<RefTruckDetails>(EMPTY_FORM);

  const { title: pageTitle } = usePage();

  const {
    data: truckDetails,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["truckDetails", search],
    queryFn: async () => {
      return await truckDetailsService.GetAll(search);
    },
    initialData: [],
  });

  const handleClickEdit = (record: RefTruckDetails) => {
    setSelectedData(record);
    setSaveModalOpen(true);
  };

  const handleClickAdd = () => {
    setSelectedData(null);
    setSaveModalOpen(true);
  };

  const handleClickCancel = () => {
    setSelectedData(null);
    setSaveModalOpen(false);
  };

  const handleDelete = async (record: RefTruckDetails) => {
    if (!record.id) throw new Error("Id is null");
    await truckDetailsService.Delete(record.id);
    await refetch();
    SweetAlert({
      title: "Successfully deleted.",
    });
  };

  const handleAfterSave = () => {
    setSelectedData(null);
    setSaveModalOpen(false);
    refetch();
  };

  const handleSearch = async (value: RefTruckDetails) => {
    await setSearch(value);
    await refetch();
  };

  const columns: TableProps<TruckDetailsDTO>["columns"] = [
    {
      title: "Plate Number",
      dataIndex: "plateNumber",
      key: "plateNumber",
    },
    {
      title: "Driver Name",
      dataIndex: "driverName",
      key: "driverName",
    },
    {
      title: "Truck Type",
      dataIndex: "truckType",
      key: "truckType",
    },
    {
      title: "Action",
      key: "action",
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
      <FilterCard onSearch={handleSearch} />
      <TableComponent<TruckDetailsDTO>
        headerTitle={pageTitle}
        columns={columns}
        dataSource={truckDetails}
        loading={isFetching}
        add={{
          onClick: handleClickAdd,
        }}
      />
    </>
  );
}
