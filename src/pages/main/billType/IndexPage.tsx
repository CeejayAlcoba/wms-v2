import { Button, Popconfirm, Tooltip, type TableProps } from "antd";
import type { MasterBillType } from "../../../@types/tables/MasterBillType";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import TableComponent from "../../../components/Table/TableComponent";
import usePage from "../../../hooks/usePage";
import FilterCard from "./FilterCard";
import { billTypeService } from "../../../services/billTypeService";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import SaveModal from "./SaveModal";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";

export default function IndexPage() {
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<MasterBillType | null>(null);
  const [search, setSearch] = useState<MasterBillType>(EMPTY_FORM);

  const { title: pageTitle } = usePage();

  const {
    data: billTypes,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["billTypes", search],
    queryFn: async ({ queryKey }) => {
      const [, searchParam] = queryKey;
      return await billTypeService.GetAll(searchParam as MasterBillType);
    },
    initialData: [],
  });

  const handleClickEdit = (record: MasterBillType) => {
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

  const handleDelete = async (record: MasterBillType) => {
    if (!record.id) throw new Error("Id is null");
    await billTypeService.Delete(record.id);
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

  const handleSearch = async (value: MasterBillType) => {
    await setSearch(value);
    await refetch();
  };

  const columns: TableProps<MasterBillType>["columns"] = [
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
      <FilterCard onSearch={handleSearch} />
      <TableComponent<MasterBillType>
        headerTitle={pageTitle}
        columns={columns}
        dataSource={billTypes}
        loading={isFetching}
        add={{
          onClick: handleClickAdd,
        }}
      />
    </>
  );
}
