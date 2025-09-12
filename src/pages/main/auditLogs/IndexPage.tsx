import { Button, Popconfirm, Tag, Tooltip, type TableProps } from "antd";
import type { MasterBillType } from "../../../@types/tables/MasterBillType";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import TableComponent from "../../../components/Table/TableComponent";
import usePage from "../../../hooks/usePage";
import FilterCard from "./FilterCard";
import { billTypeService } from "../../../services/billTypeService";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import SaveModal from "./SaveModal";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import type { AuditLogsDTO } from "../../../@types/DTOs/AuditLogsDTO";
import type { AuditLogsFilterDTO } from "../../../@types/DTOs/AuditLogsFilterDTO";
import { auditLogsService } from "../../../services/auditLogsService";
import dayjs from "dayjs";
import handleToNormalWords from "../../../utils/hadnleToNormalWords";

export default function IndexPage() {
  const [search, setSearch] = useState<AuditLogsFilterDTO>(EMPTY_FORM);

  const { title: pageTitle } = usePage();

  const {
    data: auditLogs,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["auditLogs", search],
    queryFn: async () => {
      return await auditLogsService.GetAll(search);
    },
    initialData: [],
  });

  const handleSearch = async (value: AuditLogsFilterDTO) => {
    await setSearch(value);
    await refetch();
  };

  const handlePaginate = (page: number, pageSize: number) => {
    setSearch((prev) => ({ ...prev, currentPage: page, pageSize }));
  };

  const handleUnpaginate = async () => {
    await setSearch((prev) => ({
      ...prev,
      currentPage: null,
      pageSize: null,
    }));
    await refetch();
  };

  const columns: TableProps<AuditLogsDTO>["columns"] = [
    {
      title: "Page",
      dataIndex: "pageName",
      key: "pageName",
    },
    {
      title: "Action Made",
      dataIndex: "actionType",
      key: "actionType",
      render: (value) => {
        let color: string;

        switch (value) {
          case "CREATE":
            color = "blue";
            break;
          case "UPDATE":
            color = "green";
            break;
          case "DELETE":
            color = "red";
            break;
          default:
            color = "default";
        }

        return <Tag color={color}>{value}</Tag>;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      render: (description: any, record: AuditLogsDTO) => {
        if (record.actionType === "UPDATE") {
          return (
            <>
              Updated <b>{handleToNormalWords(record?.columnAffected ?? "")}</b>{" "}
              from <b>{record.oldValue ?? "NULL"}</b> →{" "}
              <b>{record.newValue ?? "NULL"}</b>
            </>
          );
        }
        return (
          <>
            {description} ,{" "}
            <b>
              {record.columnAffected} : {record.newValue}
            </b>
          </>
        );
      },
    },

    {
      title: "Audit by",
      dataIndex: "auditName",
      key: "auditName",
    },
    {
      title: "Date",
      dataIndex: "auditDate",
      key: "auditDate",
      render: (date: Date | null) => date && dayjs(date).format("YYYY-MM-DD"),
    },
  ];

  return (
    <>
      <FilterCard onSearch={handleSearch} />
      <TableComponent<AuditLogsDTO>
        headerTitle={pageTitle}
        columns={columns}
        dataSource={auditLogs}
        loading={isFetching}
        print={{ onBeforePrint: async () => await handleUnpaginate() }}
        pdf={{ onChange: async () => await handleUnpaginate() }}
        pagination={{
          total: auditLogs?.[0]?.totalItems,
          onChange: handlePaginate,
          current: search.currentPage ?? 1,
          pageSize: search.pageSize ?? 10,
        }}
      />
    </>
  );
}
