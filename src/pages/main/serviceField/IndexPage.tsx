import { Button, Popconfirm, Tooltip, type TableProps } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import TableComponent from "../../../components/Table/TableComponent";
import usePage from "../../../hooks/usePage";
import { serviceFieldService } from "../../../services/serviceFieldService";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import type { RefServiceField } from "../../../@types/tables/RefServiceField";
import SaveModal from "./SaveModal";
import FilterCard from "./FilterCard";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";

export default function IndexPage() {
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<RefServiceField | null>(
    null
  );
  const [search, setSearch] = useState<RefServiceField>(EMPTY_FORM);

  const { title: pageTitle } = usePage();

  const {
    data: serviceFields,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["serviceFields", search],
    queryFn: async () => {
      return await serviceFieldService.GetAll(search);
    },
    initialData: [],
  });

  const handleClickEdit = (record: RefServiceField) => {
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

  const handleDelete = async (record: RefServiceField) => {
    if (!record.id) throw new Error("Id is null");
    await serviceFieldService.Delete(record.id);
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

  const handleSearch = async (value: RefServiceField) => {
    await setSearch(value);
    await refetch();
  };

  const columns: TableProps<RefServiceField>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Key",
      dataIndex: "jsonKey",
      key: "jsonKey",
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
      <TableComponent<RefServiceField>
        headerTitle={pageTitle}
        columns={columns}
        dataSource={serviceFields}
        loading={isFetching}
        add={{
          onClick: handleClickAdd,
        }}
      />
    </>
  );
}
