import { Button, Popconfirm, Tooltip, type TableProps } from "antd";
import type { RefUnitOfMeasurement } from "../../../@types/tables/RefUnitOfMeasurement";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import TableComponent from "../../../components/Table/TableComponent";
import usePage from "../../../hooks/usePage";
import { unitOfMeasurementService } from "../../../services/unitOfMeasurementService";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import SaveModal from "./SaveModal";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";

export default function IndexPage() {
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<RefUnitOfMeasurement | null>(
    null
  );
  const [search, setSearch] = useState<RefUnitOfMeasurement>(EMPTY_FORM);

  const { title: pageTitle } = usePage();

  const {
    data: unitOfMeasurements,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["unitOfMeasurements", search],
    queryFn: async ({ queryKey }) => {
      const [, searchParam] = queryKey;
      return await unitOfMeasurementService.GetAll(
        searchParam as RefUnitOfMeasurement
      );
    },
    initialData: [],
  });

  const handleClickEdit = (record: RefUnitOfMeasurement) => {
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

  const handleDelete = async (record: RefUnitOfMeasurement) => {
    if (!record.id) throw new Error("Id is null");
    await unitOfMeasurementService.Delete(record.id);
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

  const handleSearch = async (value: RefUnitOfMeasurement) => {
    await setSearch(value);
    await refetch();
  };

  const columns: TableProps<RefUnitOfMeasurement>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
      <TableComponent<RefUnitOfMeasurement>
        headerTitle={pageTitle}
        columns={columns}
        dataSource={unitOfMeasurements}
        loading={isFetching}
        add={{
          onClick: handleClickAdd,
        }}
        search={{
          onChange: (e) => handleSearch({ ...search, name: e.target.value }),
        }}
      />
    </>
  );
}
