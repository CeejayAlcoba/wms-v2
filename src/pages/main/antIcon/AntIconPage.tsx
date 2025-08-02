import { Button, Popconfirm, Table, Tooltip, type TableProps } from "antd";
import type { MasterAntIcon } from "../../../@types/tables/MasterAntIcon";
import AntIcon from "../../../components/AntIcon/AntIcon";
import { useQuery } from "@tanstack/react-query";
import { antIconService } from "../../../services/antIconService";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import TableComponent from "../../../components/TableComponent/TableComponent";
import SaveModal from "./SaveModal";
import usePage from "../../../hooks/usePage";

export default function AntIconPage() {
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<MasterAntIcon | null>(null);
  const [search, setSearch] = useState<MasterAntIcon>({
    id: null,
    name: null,
  });
  const { title: pageTitle } = usePage();
  const {
    data: antIcons,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["antIcons", search],
    queryFn: async ({ queryKey }) => {
      const [, searchParam] = queryKey;
      return await antIconService.GetAll(searchParam as MasterAntIcon);
    },
    initialData: [],
  });

  const handleClickEdit = (record: MasterAntIcon) => {
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

  const handleDelete = async (record: MasterAntIcon) => {
    if (!record.id) throw new Error("Id is null");
    await antIconService.Delete(record.id);
    await refetch();
  };

  const handleAfterSave = () => {
    setSelectedData(null);
    setSaveModalOpen(false);
    refetch();
  };

  const handleSearch = async (value: string) => {
    await setSearch((prev) => ({ ...prev, name: value }));
    await refetch();
  };

  const columns: TableProps<MasterAntIcon>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => (
        <span>
          <AntIcon icon={name} /> {` ${name}`}
        </span>
      ),
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
      <TableComponent<MasterAntIcon>
        headerTitle={pageTitle}
        columns={columns}
        dataSource={antIcons}
        loading={isFetching}
        add={{
          onClick: handleClickAdd,
        }}
        search={{
          onChange: (e) => {
            handleSearch(e.target.value);
          },
        }}
      />
    </>
  );
}
