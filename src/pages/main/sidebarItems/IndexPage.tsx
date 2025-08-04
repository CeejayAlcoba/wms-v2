import { Button, Popconfirm, Tooltip, type TableProps } from "antd";
import type { MasterSidebarMenuItem } from "../../../@types/tables/MasterSidebarMenuItem";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import TableComponent from "../../../components/TableComponent/TableComponent";

import AntIcon from "../../../components/AntIcon/AntIcon";
import SaveModal from "./SaveModal";
import { sidebarMenuItemService } from "../../../services/sidebarMenuItemService";
import usePage from "../../../hooks/usePage";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import ToggleTag from "../../../components/Toggle/ToggleTag";

export default function IndexPage() {
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] =
    useState<MasterSidebarMenuItem | null>(null);
  const [search, setSearch] = useState<MasterSidebarMenuItem>({
    id: null,
    name: null,
    antIconId: null,
  });
  const { title: pageTitle } = usePage();

  const {
    data: sidebarMenuItems,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["sidebarMenuItems", search],
    queryFn: async ({ queryKey }) => {
      const [, searchParam] = queryKey;
      return await sidebarMenuItemService.GetAll(
        searchParam as MasterSidebarMenuItem
      );
    },
    initialData: [],
  });

  const handleClickEdit = (record: MasterSidebarMenuItem) => {
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

  const handleDelete = async (record: MasterSidebarMenuItem) => {
    if (!record.id) throw new Error("Id is null");
    await sidebarMenuItemService.Delete(record.id);
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

  const handleSearch = async (value: string) => {
    await setSearch((prev) => ({ ...prev, name: value }));
    await refetch();
  };

  const columns: TableProps<MasterSidebarMenuItem>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Sidebar Menu",
      dataIndex: "sidebarMenu",
      key: "sidebarMenu",
    },
    {
      title: "Key name",
      dataIndex: "keyName",
      key: "keyName",
    },
    {
      title: "Visible",
      dataIndex: "isVisible",
      key: "isVisible",
      render: (data) => <ToggleTag data={data} />,
    },
    {
      title: "Any roles",
      dataIndex: "isAccessibleToAnyRole",
      key: "isAccessibleToAnyRole",
      render: (data) => <ToggleTag data={data}/>,
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
      <TableComponent<MasterSidebarMenuItem>
        headerTitle={pageTitle}
        columns={columns}
        dataSource={sidebarMenuItems}
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
