import { Button, Popconfirm, Tooltip, type TableProps } from "antd";
import type { RefOtherService } from "../../../@types/tables/RefOtherService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import TableComponent from "../../../components/Table/TableComponent";
import SaveModal from "./SaveModal";
import usePage from "../../../hooks/usePage";
import FilterCard from "./FilterCard";
import { otherServiceService } from "../../../services/otherServiceService";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";

export default function IndexPage() {
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<RefOtherService | null>(null);
  const [search, setSearch] = useState<RefOtherService>(EMPTY_FORM);

  const { title: pageTitle } = usePage();

  const {
    data: otherServices,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["otherServices", search],
    queryFn: async () => {
      return await otherServiceService.GetAll(search);
    },
    initialData: [],
  });

  const handleClickEdit = (record: RefOtherService) => {
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

  const handleDelete = async (record: RefOtherService) => {
    if (!record.id) throw new Error("Id is null");
    await otherServiceService.Delete(record.id);
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

  const handleSearch = async (value: RefOtherService) => {
    await setSearch(value);
    await refetch();
  };

  const columns: TableProps<RefOtherService>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Formula",
      dataIndex: "formula",
      key: "formula",
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
      <TableComponent<RefOtherService>
        headerTitle={pageTitle}
        columns={columns}
        dataSource={otherServices}
        loading={isFetching}
        add={{
          onClick: handleClickAdd,
        }}
      />
    </>
  );
}
