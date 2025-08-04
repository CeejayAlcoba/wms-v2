import { Button, Popconfirm, Table, Tooltip, type TableProps } from "antd";
import type { RefPrincipal } from "../../../@types/tables/RefPrincipal";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import TableComponent from "../../../components/TableComponent/TableComponent";
import SaveModal from "./SaveModal";
import usePage from "../../../hooks/usePage";
import FilterCard from "./FilterCard";
import { principalService } from "../../../services/principalService";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";

export default function IndexPage() {
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<RefPrincipal | null>(null);
  const [search, setSearch] = useState<RefPrincipal>(EMPTY_FORM);

  const { title: pageTitle } = usePage();

  const {
    data: principals,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["principals", search],
    queryFn: async ({ queryKey }) => {
      const [, searchParam] = queryKey;
      return await principalService.GetAll(searchParam as RefPrincipal);
    },
    initialData: [],
  });

  const handleClickEdit = (record: RefPrincipal) => {
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

  const handleDelete = async (record: RefPrincipal) => {
    if (!record.id) throw new Error("Id is null");
    await principalService.Delete(record.id);
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

  const handleSearch = async (value: RefPrincipal) => {
    await setSearch(value);
    await refetch();
  };

  const columns: TableProps<RefPrincipal>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "otherName",
      dataIndex: "otherName",
      key: "otherName",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
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
      <TableComponent<RefPrincipal>
        headerTitle={pageTitle}
        columns={columns}
        dataSource={principals}
        loading={isFetching}
        add={{
          onClick: handleClickAdd,
        }}
      />
    </>
  );
}
