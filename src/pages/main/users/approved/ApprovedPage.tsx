import { useQuery } from "@tanstack/react-query";
import { userService } from "../../../../services/userService";
import TableComponent from "../../../../components/Table/TableComponent";
import { Button, Popconfirm, Tooltip, type TableProps } from "antd";
import dayjs from "dayjs";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { UserDTO } from "../../../../@types/DTOs/UserDTO";
import type { RefRole } from "../../../../@types/tables/RefRole";
import SweetAlert from "../../../../components/SweetAlert/SweetAlert";
import SaveModal from "../SaveModal";
import useUser from "../../../../contexts/useUser";

export default function ApprovedPage(props: { search: UserDTO }) {
  const { search } = props;
  const [saveModal, setSaveModal] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<UserDTO | null>(null);
  const {user} = useUser();
  const { data: userPendings, refetch } = useQuery({
    queryKey: ["userPendings", search],
    queryFn: async () =>
      await userService.GetAll({ isApproved: true, ...search }),
    initialData: [],
  });

  const handleClickEdit = (record: UserDTO) => {
    setSelectedData(record);
    setSaveModal(true);
  };
  const handleClickAdd = () => {
    setSelectedData(null);
    setSaveModal(true);
  };
  const handleDelete = async (record: UserDTO) => {
    if (!record.id) throw new Error("Id is null");
    await userService.Delete(record.id);
    SweetAlert({
      title: "Successfully deleted",
    });
    refetch();
  };
  const handleSave = () => {
    setSaveModal(false);
    refetch();
  };
  const handleCancel = () => {
    setSaveModal(false);
    setSelectedData(null);
  };
  const columns: TableProps<UserDTO>["columns"] = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Employee Number",
      dataIndex: "employeeNumber",
      key: "employeeNumber",
    },
    {
      title: "Birthday",
      dataIndex: "birthday",
      key: "birthday",
      render: (value: Date) => value && dayjs(value).format("YYYY-MM-DD"),
    },
    {
      title: "Roles",
      dataIndex: "roles",
      key: "roles",
      render: (value: RefRole[]) => value.map((v) => v.name).join(","),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        (user?.isMaster || !record.isMaster) && (
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
        type={selectedData ? "Update" : "Add"}
        open={saveModal}
        onAfterSave={handleSave}
        onCancel={handleCancel}
        selectedData={selectedData}
      />

      <TableComponent<UserDTO>
        add={{ onClick: () => handleClickAdd() }}
        headerTitle="Approved Users"
        rowKey="id"
        columns={columns}
        dataSource={userPendings}
        pagination={{ pageSize: 5 }}
      />
    </>
  );
}
