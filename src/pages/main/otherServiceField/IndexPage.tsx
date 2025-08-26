import { Button, Popconfirm, Table, Tooltip, type TableProps } from "antd";
import type { RefOtherServiceField } from "../../../@types/tables/RefOtherServiceField";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import TableComponent from "../../../components/Table/TableComponent";
import SaveModal from "./SaveModal";
import usePage from "../../../hooks/usePage";
import FilterCard from "./FilterCard";
import { otherServiceFieldService } from "../../../services/otherServiceFieldService";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";

export default function IndexPage() {
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<RefOtherServiceField | null>(null);
  const [search, setSearch] = useState<RefOtherServiceField>(EMPTY_FORM);

  const { title: pageTitle } = usePage();

  const {
    data: otherServiceFields,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["otherServiceFields", search],
    queryFn: async () => {
      return await otherServiceFieldService.GetAll(search);
    },
    initialData: [],
  });

  const handleClickEdit = (record: RefOtherServiceField) => {
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

  const handleDelete = async (record: RefOtherServiceField) => {
    if (!record.id) throw new Error("Id is null");
    await otherServiceFieldService.Delete(record.id);
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

  const handleSearch = async (value: RefOtherServiceField) => {
    await setSearch(value);
    await refetch();
  };

  const columns: TableProps<RefOtherServiceField>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Json Key",
      dataIndex: "jsonKey",
      key: "jsonKey",
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
      <TableComponent<RefOtherServiceField>
        headerTitle={pageTitle}
        columns={columns}
        dataSource={otherServiceFields}
        loading={isFetching}
        add={{
          onClick: handleClickAdd,
        }}
      />
    </>
  );
}
