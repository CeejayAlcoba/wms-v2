import { Button, Popconfirm, Tooltip, type TableProps } from "antd";
import type { BillingConfiguration } from "../../../@types/tables/BillingConfiguration";
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
import { billingConfigurationService } from "../../../services/billingConfigurationService";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import SaveModal from "./SaveModal";
import type { BillingConfigurationDTO } from "../../../@types/DTOs/BillingConfigurationDTO";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import ToggleText from "../../../components/Toggle/ToggleText";

export default function IndexPage() {
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<BillingConfiguration | null>(
    null
  );
  const [search, setSearch] = useState<BillingConfiguration>(EMPTY_FORM);

  const { title: pageTitle } = usePage();

  const {
    data: billingConfigurations,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["billingConfigurations", search],
    queryFn: async ({ queryKey }) => {
      const [, searchParam] = queryKey;
      return await billingConfigurationService.GetAll(
        searchParam as BillingConfiguration
      );
    },
    initialData: [],
  });

  const handleClickEdit = (record: BillingConfiguration) => {
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

  const handleDelete = async (record: BillingConfiguration) => {
    if (!record.id) throw new Error("Id is null");
    await billingConfigurationService.Delete(record.id);
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

  const handleSearch = async (value: BillingConfiguration) => {
    await setSearch(value);
    await refetch();
  };

  const columns: TableProps<BillingConfigurationDTO>["columns"] = [
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
            ₱ {value} / {record.handlingInBillType}
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
            ₱ {value} /{record.handlingOutBillType}
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
            ₱ {value} / {record.storageBillType}
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
      <TableComponent<BillingConfiguration>
        headerTitle={pageTitle}
        columns={columns}
        dataSource={billingConfigurations}
        loading={isFetching}
        add={{
          onClick: handleClickAdd,
        }}
      />
    </>
  );
}
