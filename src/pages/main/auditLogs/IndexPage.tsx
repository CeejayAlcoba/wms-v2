import { Tag, type TableProps } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import TableComponent from "../../../components/Table/TableComponent";
import usePage from "../../../hooks/usePage";
import FilterCard from "./FilterCard";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import type { AuditLogsDTO } from "../../../@types/DTOs/AuditLogsDTO";
import type { AuditLogsFilterDTO } from "../../../@types/DTOs/AuditLogsFilterDTO";
import { auditLogsService } from "../../../services/auditLogsService";
import dayjs from "dayjs";
import handleToNormalWords from "../../../utils/hadnleToNormalWords";
import { ACTION_TYPES } from "./__constants__/ACTION_TYPE";

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
      title: "Module",
      dataIndex: "pageName",
      key: "pageName",
    },
    {
      title: "Action Made",
      dataIndex: "actionType",
      key: "actionType",
      render: (value: string) => {
        const actionType = ACTION_TYPES.find((a) => a.value === value);
        return <Tag color={actionType?.color}>{actionType?.label}</Tag>;
      },
    },
    {
      title: "Target",
      dataIndex: "targetName",
      key: "targetName",
      render: (targetName: string, record: AuditLogsDTO) => {
        return (
          <span>
            {targetName} <strong>{record?.targetValue}</strong>
          </span>
        );
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
              Updated <b>{handleToNormalWords(record.columnDisplay ?? "_")}</b>{" "}
              from <b>{record.oldDisplayValue ?? "_"}</b> →{" "}
              <b>{record.newDisplayValue ?? "_"}</b>
            </>
          );
        }
        return description;
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
    {
      title: "Time",
      render: (_, record: AuditLogsDTO) =>
        record.auditDate && dayjs(record.auditDate).format("hh:mm:ss A"),
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
