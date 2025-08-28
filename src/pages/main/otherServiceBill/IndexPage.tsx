import { Button, Popconfirm, Tooltip, type TableProps } from "antd";
import { useQuery } from "@tanstack/react-query";
import { antIconService } from "../../../services/antIconService";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import TableComponent from "../../../components/Table/TableComponent";
import SaveModal from "./SaveModal";
import usePage from "../../../hooks/usePage";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import type { OtherServiceBill } from "../../../@types/tables/OtherServiceBill";
import { billingStatementService } from "../../../services/billingStatementService";
import type { BillingStatement } from "../../../@types/tables/BillingStatement";
import { EMPTY_SEARCH } from "./__contants__/EMPTY_SEARCH";
import type { BillingStatementDTO } from "../../../@types/DTOs/BillingStatementDTO";
import dayjs from "dayjs";
import FilterCard from "./FilterCard";
import type { FormikHelpers } from "formik";
import OtherServicesTable from "./OtherServicesTable";
import type { OtherServiceBillDTO } from "../../../@types/DTOs/OtherServiceBillDTO";
import { otherServiceBillService } from "../../../services/otherServiceService";

export default function IndexPage() {
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [otherServces, setOtherServices] = useState<OtherServiceBillDTO[]>([]);
  const [selectedData, setSelectedData] = useState<OtherServiceBill | null>(
    null
  );
  const [search, setSearch] = useState<BillingStatement>(EMPTY_SEARCH);
  const { title: pageTitle } = usePage();
  const {
    data: billingStatements,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["billingStatements", search],
    queryFn: async () => {
      return await billingStatementService.GetAll(search);
    },
    initialData: [],
  });

  const handleClickEdit = (record: OtherServiceBill) => {
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

  const handleDelete = async (record: OtherServiceBill) => {
    if (!record.id) throw new Error("Id is null");
    await antIconService.Delete(record.id);
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

  const handleSearch = (
    values: BillingStatement,
    formikHelpers: FormikHelpers<BillingStatement>
  ) => {
    formikHelpers.setSubmitting(true);
    setSearch(values);
    formikHelpers.setSubmitting(false);
  };

  const handleExpand = async (
    expanded: boolean,
    record: BillingStatementDTO
  ) => {
    if (expanded) {
      const res = await otherServiceBillService.GetByBillingStatementId(
        record?.id ?? 0
      );
      setOtherServices((prev) => [...prev, ...res]);
    } else {
      const filteredCargo = otherServces.filter(
        (c) => c.billingStatementId !== record.id
      );
      setOtherServices(filteredCargo);
    }
  };

  const columns: TableProps<BillingStatementDTO>["columns"] = [
    {
      title: "Principal",
      dataIndex: "principal",
      key: "principal",
    },
    {
      title: "Product Category",
      dataIndex: "productCategory",
      key: "productCategory",
    },
    {
      title: "Ref No",
      dataIndex: "referenceNumber",
      key: "referenceNumber",
    },
    {
      title: "Date From",
      dataIndex: "dateFrom",
      key: "dateFrom",
      render: (value: Date) => value && dayjs(value).format("YYYY-MM-DD"),
    },
    {
      title: "Date To",
      dataIndex: "dateTo",
      key: "dateTo",
      render: (value: Date) => value && dayjs(value).format("YYYY-MM-DD"),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => {
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
      <FilterCard onSearch={handleSearch} />
      <TableComponent<BillingStatementDTO>
        rowKey="id"
        headerTitle={pageTitle}
        columns={columns}
        dataSource={billingStatements}
        loading={isFetching}
        add={{
          onClick: handleClickAdd,
        }}
        expandable={{
          expandedRowRender: (record) => (
            <OtherServicesTable otherServices={otherServces} record={record} />
          ),
          onExpand: handleExpand,
        }}
      />
    </>
  );
}
