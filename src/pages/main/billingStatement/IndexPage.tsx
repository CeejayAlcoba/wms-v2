import { Button, Popconfirm, Table, Tooltip, type TableProps } from "antd";
import type { BillingStatement } from "../../../@types/tables/BillingStatement";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  PercentageOutlined,
} from "@ant-design/icons";
import TableComponent from "../../../components/Table/TableComponent";
import usePage from "../../../hooks/usePage";
import FilterCard from "./FilterCard";
import { billingStatementService } from "../../../services/billingStatementService";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import SaveModal from "./SaveModal";
import type { BillingStatementDTO } from "../../../@types/DTOs/BillingStatementDTO";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import ToggleText from "../../../components/Toggle/ToggleText";

export default function IndexPage() {
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<BillingStatement | null>(
    null
  );
  const [search, setSearch] = useState<BillingStatement>(EMPTY_FORM);

  const { title: pageTitle } = usePage();

  const {
    data: billingStatements,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["billingStatements", search],
    queryFn: async ({ queryKey }) => {
      const [, searchParam] = queryKey;
      return await billingStatementService.GetAll(
        searchParam as BillingStatement
      );
    },
    initialData: [],
  });

  const handleClickEdit = (record: BillingStatement) => {
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

  const handleDelete = async (record: BillingStatement) => {
    if (!record.id) throw new Error("Id is null");
    await billingStatementService.Delete(record.id);
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

  const handleSearch = async (value: BillingStatement) => {
    await setSearch(value);
    await refetch();
  };

  const columns: TableProps<BillingStatementDTO>["columns"] = [
    {
      title: "Principal",
      dataIndex: "principal",
      key: "principal",
    },
    {
      title: "Handling In Rate",
      dataIndex: "handlingInRate",
      key: "handlingInRate",
      render: (value, record) => (
        <span>
          <ToggleText
            data={record.handlingInBillType == "CBM"}
            falseProps={{ style: { color: "green" } }}
          >
            {value} / {record.handlingInBillType}
          </ToggleText>
        </span>
      ),
    },
    {
      title: "Handling Out Rate",
      dataIndex: "handlingOutRate",
      key: "handlingOutRate",
      render: (value, record) => (
        <span>
          <ToggleText
            data={record.handlingOutBillType == "CBM"}
            falseProps={{ style: { color: "green" } }}
          >
            {value} /{record.handlingOutBillType}
          </ToggleText>
        </span>
      ),
    },
    {
      title: "Storage Rate",
      dataIndex: "storageRate",
      key: "storageRate",
      render: (value, record) => (
        <span>
          <ToggleText
            data={record.storageBillType == "CBM"}
            falseProps={{ style: { color: "green" } }}
          >
            {value} / {record.storageBillType}
          </ToggleText>
        </span>
      ),
    },
    {
      title: "VAT",
      dataIndex: "valueAddedTax",
      key: "valueAddedTax",
      render: (value) => (
        <span>
          {value} <PercentageOutlined />
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
      <TableComponent<BillingStatement>
        headerTitle={pageTitle}
        columns={columns}
        dataSource={billingStatements}
        loading={isFetching}
        add={{
          onClick: handleClickAdd,
        }}
      />
    </>
  );
}
