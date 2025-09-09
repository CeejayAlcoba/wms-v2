import { useQuery } from "@tanstack/react-query";
import { userService } from "../../../../services/userService";
import TableComponent from "../../../../components/Table/TableComponent";
import { Button, Tooltip, type TableProps } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import type { UserDTO } from "../../../../@types/DTOs/UserDTO";
import SaveModal from "../SaveModal";

export default function PendingPage(props: { search: UserDTO }) {
  const { search } = props;
  const [saveModal, setSaveModal] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<UserDTO | null>(null);

  const { data: userPendings, refetch } = useQuery({
    queryKey: ["userPendings", search],
    queryFn: async () =>
      await userService.GetAll({ isApproved: false, ...search }),
    initialData: [],
  });

  const handleClickApprove = (record: UserDTO) => {
    setSelectedData(record);
    setSaveModal(true);
  };
  const handleApproved = () => {
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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="d-flex gap-1">
          <Tooltip title="Approve">
            <Button
              className="bg-warning"
              shape="circle"
              variant="solid"
              icon={<CheckCircleOutlined />}
              onClick={() => handleClickApprove(record)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      <SaveModal
        type="Approve"
        open={saveModal}
        onAfterSave={handleApproved}
        onCancel={handleCancel}
        selectedData={selectedData}
      />

      <TableComponent<UserDTO>
        headerTitle="Pending Users"
        rowKey="id"
        columns={columns}
        dataSource={userPendings}
        pagination={{ pageSize: 5 }}
      />
    </>
  );
}
