import { Button, Popconfirm, Tooltip, type TableProps } from "antd";
import type { RefTruckType } from "../../../@types/tables/RefTruckType";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import TableComponent from "../../../components/TableComponent/TableComponent";
import usePage from "../../../hooks/usePage";
import { truckTypeService } from "../../../services/truckTypeService";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import SaveModal from "./SaveModal";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";

export default function IndexPage() {
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<RefTruckType | null>(null);
  const [search, setSearch] = useState<RefTruckType>(EMPTY_FORM);

  const { title: pageTitle } = usePage();

  const {
    data: truckTypes,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["truckTypes", search],
    queryFn: async ({ queryKey }) => {
      const [, searchParam] = queryKey;
      return await truckTypeService.GetAll(searchParam as RefTruckType);
    },
    initialData: [],
  });

  const handleClickEdit = (record: RefTruckType) => {
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

  const handleDelete = async (record: RefTruckType) => {
    if (!record.id) throw new Error("Id is null");
    await truckTypeService.Delete(record.id);
    await refetch();
    SweetAlert({
      title:"Successfully deleted."
    })
  };

  const handleAfterSave = () => {
    setSelectedData(null);
    setSaveModalOpen(false);
    refetch();
  };

  const handleSearch = async (value: RefTruckType) => {
    await setSearch(value);
    await refetch();
  };

  const columns: TableProps<RefTruckType>["columns"] = [
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
      <TableComponent<RefTruckType>
        headerTitle={pageTitle}
        columns={columns}
        dataSource={truckTypes}
        loading={isFetching}
        add={{
          onClick: handleClickAdd,
        }}
        search={{
          onChange: (e) =>
           handleSearch({...search,name:e.target.value})
        }}
      />
    </>
  );
}
