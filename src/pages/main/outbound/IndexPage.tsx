import { Button, Popconfirm, Tooltip, type TableProps } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import TableComponent from "../../../components/Table/TableComponent";
import usePage from "../../../hooks/usePage";
import FilterCard from "./FilterCard";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import type { ReportOutboundFilterDTO } from "../../../@types/DTOs/ReportOutboundFilterDTO";
import { reportService } from "../../../services/reportService";
import dayjs from "dayjs";
import { handleMoney } from "../../../utils/handleMoney";
import type { ReportOutboundDTO } from "../../../@types/DTOs/ReportOutboundDTO";
import TableTotalFooter from "../../../components/Table/TableTotalFooter";
import { TABLE_TOTAL_FOOTER } from "../../../constants/TABLE_TOTAL_FOOTER";
import useDocument from "../../../contexts/useDocument";
import { usePrint } from "../../../hooks/usePrint";
import DocumentTable from "../../../components/Documents/DocumentTable";

export default function IndexPage() {
  const [search, setSearch] = useState<ReportOutboundFilterDTO>(EMPTY_FORM);
  const [progress, setProgress] = useState<number>(0);

  const { title: pageTitle } = usePage();
  const {
    data: reports,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["reports", search],
    queryFn: async () => {
      return await reportService.OutboundGetAll(search);
    },
    initialData: {
      items: [],
      totalItems: 0,
    },
  });

  const handleSearch = async (value: ReportOutboundFilterDTO) => {
    await setSearch(value);
    await refetch();
  };

  const columns: TableProps<ReportOutboundDTO>["columns"] = [
    {
      title: "Actual Check-in Date",
      dataIndex: "actualCheckInDate",
      key: "actualCheckInDate",
      render: (value) => dayjs(value).format("YYYY-MM-DD"),
    },
    {
      title: "ICR",
      dataIndex: "icrReferenceNumber",
      key: "icrReferenceNumber",
    },
    {
      title: "DR",
      dataIndex: "drNumber",
      key: "drNumber",
    },
    {
      title: "SKU",
      dataIndex: "skuCode",
      key: "skuCode",
    },
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
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Bin Location",
      dataIndex: "binLocation",
      key: "binLocation",
    },
    {
      title: "Pallete",
      dataIndex: "pickListPalleteCount",
      key: "pickListPalleteCount",
    },
    {
      title: "Quantity",
      dataIndex: "pickListQuantity",
      key: "pickListQuantity",
    },
    {
      title: "CBM",
      dataIndex: "pickListCubicMeter",
      key: "pickListCubicMeter",
    },
    {
      title: "Dimension",
      key: "dimension",
      render: (_, record) => {
        const { lengthCm, widthCm, heightCm } = record;
        if (lengthCm && widthCm && heightCm) {
          return `${lengthCm} x ${widthCm} x ${heightCm} cm`;
        }
        return <span className="text-secondary">N/A</span>;
      },
    },
    {
      title: "Unit of Measurement",
      dataIndex: "unitOfMeasurement",
      key: "unitOfMeasurement",
    },

    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (value) => handleMoney(value),
    },
    {
      title: "GR",
      dataIndex: "goodsReceipt",
      key: "goodsReceipt",
    },
  ];
  const handlePaginate = (page: number, pageSize: number) => {
    setSearch((prev) => ({ ...prev, currentPage: page, pageSize }));
  };

  const componentRef = useRef<HTMLDivElement | null>(null);
  const { handlePrint: onPrint } = usePrint(componentRef);
  const { handleDelay } = useDocument();
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  const handlePrint = async () => {
    handleDelay({
      progress,
      fn: () => onPrint(),
    });
    while (progress < 100) {
      setProgress(progress + 10);

      console.log(`Progress: ${progress}%`);

      if (progress >= 100) {
        break; // stop loop when done
      }

      await delay(100000);
    }
  };

  return (
    <>
      <FilterCard onSearch={handleSearch} />
      <TableComponent<ReportOutboundDTO>
        print={{ onChange: handlePrint }}
        headerTitle={pageTitle}
        columns={columns}
        dataSource={reports.items}
        pagination={{ total: reports.totalItems, onChange: handlePaginate }}
        loading={isFetching}
        footer={() => (
          <TableTotalFooter<ReportOutboundDTO>
            data={reports.items}
            values={TABLE_TOTAL_FOOTER}
          />
        )}
      />
      <DocumentTable
        ref={componentRef}
        className="light-table"
        headerTitle={pageTitle}
        columns={columns}
        dataSource={reports.items}
      />
    </>
  );
}
