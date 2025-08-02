import { Button, Popconfirm, Table, Tooltip, type TableProps } from "antd";
import type { MasterSidebarMenu } from "../../../@types/tables/MasterSidebarMenu";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import TableComponent from "../../../components/TableComponent/TableComponent";

import { sidebarMenuService } from "../../../services/sidebarMenuService";
import AntIcon from "../../../components/AntIcon/AntIcon";
import SaveModal from "./SaveModal";
import usePage from "../../../hooks/usePage";
import FilterCard from "./FilterCard";

export default function SidebarMenuPage() {
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<MasterSidebarMenu | null>(
    null
  );
  const [search, setSearch] = useState<MasterSidebarMenu>({
    id: null,
    name: null,
    antIconId: null,
  });

  const { title: pageTitle } = usePage();

  const {
    data: sidebarMenus,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["sidebarMenus", search],
    queryFn: async ({ queryKey }) => {
      const [, searchParam] = queryKey;
      return await sidebarMenuService.GetAll(searchParam as MasterSidebarMenu);
    },
    initialData: [],
  });

  const handleClickEdit = (record: MasterSidebarMenu) => {
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

  const handleDelete = async (record: MasterSidebarMenu) => {
    if (!record.id) throw new Error("Id is null");
    await sidebarMenuService.Delete(record.id);
    await refetch();
  };

  const handleAfterSave = () => {
    setSelectedData(null);
    setSaveModalOpen(false);
    refetch();
  };

  const handleSearch = async (value: MasterSidebarMenu) => {
    await setSearch(value);
    await refetch();
  };

  const columns: TableProps<MasterSidebarMenu>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Icon",
      dataIndex: "antIcon",
      key: "antIcon",
      render: (antIcon) => (
        <span>
          {antIcon && (
            <>
              <AntIcon icon={antIcon} /> {` ${antIcon}`}
            </>
          )}
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
      <FilterCard onSearch={handleSearch} />
      <TableComponent<MasterSidebarMenu>
        headerTitle={pageTitle}
        columns={columns}
        dataSource={sidebarMenus}
        loading={isFetching}
        add={{
          onClick: handleClickAdd,
        }}
      />
    </>
  );
}
