import { Button, Popconfirm, Tag, Tooltip, type TableProps } from "antd";
import { useQuery } from "@tanstack/react-query";
import { antIconService } from "../../../services/antIconService";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import TableComponent from "../../../components/Table/TableComponent";
import SaveModal from "./SaveModal";
import usePage from "../../../hooks/usePage";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import { roleService } from "../../../services/roleService";
import type { RoleDTO } from "../../../@types/DTOs/RoleDTO";
import type { SidebarMenuItemDTO } from "../../../@types/DTOs/SidebarMenuItemDTO";
import useUser from "../../../contexts/useUser";

export default function IndexPage() {
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<RoleDTO | null>(null);
  const {user}=useUser();
  const [search, setSearch] = useState<RoleDTO>({
    id: null,
    name: null,
    sidebarMenuItems: [],
  });
  const { title: pageTitle } = usePage();
  const {
    data: roles,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["roles", search],
    queryFn: async () => {
      return await roleService.GetAllWithSidebar(search);
    },
    initialData: [],
  });

  const handleClickEdit = (record: RoleDTO) => {
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

  const handleDelete = async (record: RoleDTO) => {
    if (!record.id) throw new Error("Id is null");
    await roleService.Delete(record.id);
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

  const handleSearch = async (value: string) => {
    await setSearch((prev) => ({ ...prev, name: value }));
    await refetch();
  };

  const columns: TableProps<RoleDTO>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Sidebars",
      dataIndex: "sidebarMenuItems",
      key: "sidebarMenuItems",
      width: 500,
      render: (value: SidebarMenuItemDTO[]) => {
        return (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "6px",
              maxWidth: "100%",
            }}
          >
            {value.map((v, index) => (
              <Tag
                color="blue"
                key={index}
                style={{
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                }}
              >
                {v.name}
              </Tag>
            ))}
          </div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        if (user?.isMaster || !record.isMaster)
          return (
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
          );
      },
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
      <TableComponent<RoleDTO>
        headerTitle={pageTitle}
        columns={columns}
        dataSource={roles}
        loading={isFetching}
        add={{
          onClick: handleClickAdd,
        }}
        search={{
          onChange: (e: any) => {
            handleSearch(e.target.value);
          },
        }}
      />
    </>
  );
}
