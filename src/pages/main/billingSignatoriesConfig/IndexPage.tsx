import { Button, Popconfirm, Tooltip, type TableProps } from "antd";
import type { BillingSignatoriesConfig } from "../../../@types/tables/BillingSignatoriesConfig";
import { useQuery } from "@tanstack/react-query";
import { billingSignatoriesConfigService } from "../../../services/billingSignatoriesConfigService";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import TableComponent from "../../../components/Table/TableComponent";
import SaveModal from "./SaveModal";
import usePage from "../../../hooks/usePage";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import { EMPTY_FORM } from "./__contants__/EMPTY_FORM";

export default function IndexPage() {
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] =
    useState<BillingSignatoriesConfig | null>(null);
  const [search, setSearch] = useState<BillingSignatoriesConfig>(EMPTY_FORM);
  const { title: pageTitle } = usePage();
  const {
    data: billingSignatoriesConfigs,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["billingSignatoriesConfigs", search],
    queryFn: async ({ queryKey }) => {
      const [, searchParam] = queryKey;
      return await billingSignatoriesConfigService.GetAll(
        searchParam as BillingSignatoriesConfig
      );
    },
    initialData: [],
  });

  const handleClickEdit = (record: BillingSignatoriesConfig) => {
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

  const handleDelete = async (record: BillingSignatoriesConfig) => {
    if (!record.id) throw new Error("Id is null");
    await billingSignatoriesConfigService.Delete(record.id);
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

  const columns: TableProps<BillingSignatoriesConfig>["columns"] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Sort Order",
      dataIndex: "sortOrder",
      key: "sortOrder",
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
      <TableComponent<BillingSignatoriesConfig>
        headerTitle={pageTitle}
        columns={columns}
        dataSource={billingSignatoriesConfigs}
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
