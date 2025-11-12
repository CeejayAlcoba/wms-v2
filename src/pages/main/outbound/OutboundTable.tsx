import { useQuery } from "@tanstack/react-query";
import type { ReportOutboundDTO } from "../../../@types/DTOs/ReportOutboundDTO";
import TableComponent from "../../../components/Table/TableComponent";
import TableTotalFooter from "../../../components/Table/TableTotalFooter";
import usePage from "../../../hooks/usePage";
import { reportService } from "../../../services/reportService";
import type { TableProps } from "antd";
import dayjs from "dayjs";
import { handleMoney } from "../../../utils/handleMoney";
import type { ReportOutboundFilterDTO } from "../../../@types/DTOs/ReportOutboundFilterDTO";
import { TABLE_TOTAL_FOOTER } from "../../../constants/TABLE_TOTAL_FOOTER";

type OutboundTableProps = {
  search: ReportOutboundFilterDTO;
  setSearch: React.Dispatch<React.SetStateAction<ReportOutboundFilterDTO>>;
  title?: string;
};

export default function OutboundTable({
  search,
  setSearch,
  title,
}: OutboundTableProps) {
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

  const columns: TableProps<ReportOutboundDTO>["columns"] = [
    {
      title: "Pull Out Date",
      dataIndex: "pullOutDate",
      key: "pullOutDate",
      render: (value) => dayjs(value).format("YYYY-MM-DD"),
    },
    {
      title: "Check-in Date",
      dataIndex: "actualCheckInDate",
      key: "actualCheckInDate",
      render: (value) => dayjs(value).format("YYYY-MM-DD"),
    },
    {
      title: "GI",
      dataIndex: "goodIssueDetailsId",
      key: "goodIssueDetailsId",
      render: (value) => value && `GI-${value}`,
    },
    {
      title: "OCR",
      dataIndex: "ocrNumber",
      key: "ocrNumber",
    },
    {
      title: "PL",
      dataIndex: "pickListDetailsId",
      key: "pickListDetailsId",
      render: (value) => `PL-${value}`,
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
      title: "PRO",
      dataIndex: "proNumber",
      key: "proNumber",
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
      title: "UOM",
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

  const handleUnpaginate = async () => {
    await setSearch((prev) => ({
      ...prev,
      currentPage: null,
      pageSize: null,
    }));
    await refetch();
  };
  return (
    <TableComponent<ReportOutboundDTO>
      print={{ onBeforePrint: async () => await handleUnpaginate() }}
      pdf={{ onChange: async () => await handleUnpaginate() }}
      headerTitle={title ?? pageTitle}
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
  );
}
