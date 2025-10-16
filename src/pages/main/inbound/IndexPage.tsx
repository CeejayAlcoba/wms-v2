import { Button, Popconfirm, Tooltip, type TableProps } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import TableComponent from "../../../components/Table/TableComponent";
import usePage from "../../../hooks/usePage";
import FilterCard from "./FilterCard";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import type { ReportInboundFilterDTO } from "../../../@types/DTOs/ReportInboundFilterDTO";
import type { CargoDetails } from "../../../@types/tables/CargoDetails";
import SaveModal from "./SaveModal";
import { reportService } from "../../../services/reportService";
import dayjs from "dayjs";
import { handleMoney } from "../../../utils/handleMoney";
import { cargoDetailsService } from "../../../services/cargoDetailsService";
import type { ReportInboundDTO } from "../../../@types/DTOs/ReportInboundDTO";
import TableTotalFooter from "../../../components/Table/TableTotalFooter";
import { TABLE_TOTAL_FOOTER } from "../../../constants/TABLE_TOTAL_FOOTER";

export default function IndexPage() {
  const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<CargoDetails | null>(null);
  const [search, setSearch] = useState<ReportInboundFilterDTO>(EMPTY_FORM);

  const { title: pageTitle } = usePage();

  const {
    data: reports,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["reports", search],
    queryFn: async () => {
      return await reportService.InboundGetAll(search);
    },
    initialData: [],
  });

  const handleClickEdit = (record: ReportInboundDTO) => {
    setSelectedData(record);
    setSaveModalOpen(true);
  };

  const handleClickCancel = () => {
    setSelectedData(null);
    setSaveModalOpen(false);
  };

  const handleDelete = async (record: ReportInboundDTO) => {
    if (!record.id) throw new Error("Id is null");
    await cargoDetailsService.Delete(record.id);
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

  const handleSearch = async (value: ReportInboundFilterDTO) => {
    await setSearch(value);
    await refetch();
  };

  const columns: TableProps<ReportInboundDTO>["columns"] = [
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
      dataIndex: "palleteCount",
      key: "palleteCount",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "CBM",
      dataIndex: "cubicMeter",
      key: "cubicMeter",
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

    {
      title: "Action",
      key: "action",
      fixed: "right",
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
    <>
      <SaveModal
        open={saveModalOpen}
        onAfterSave={handleAfterSave}
        onCancel={handleClickCancel}
        selectedData={selectedData}
      />
      <FilterCard onSearch={handleSearch} />
      <TableComponent<ReportInboundDTO>
        headerTitle={pageTitle}
        columns={columns}
        dataSource={reports}
        loading={isFetching}
        print={{ onBeforePrint: async () => await handleUnpaginate() }}
        pdf={{ onChange: async () => await handleUnpaginate() }}
        pagination={{
          total: reports?.[0]?.totalItems,
          onChange: handlePaginate,
        }}
        footer={() => (
          <TableTotalFooter<ReportInboundDTO>
            data={reports}
            values={TABLE_TOTAL_FOOTER}
          />
        )}
      />
    </>
  );
}
