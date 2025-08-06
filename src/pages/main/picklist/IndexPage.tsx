import { Badge, Button, Tooltip, type TableProps } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { PlusOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import TableComponent from "../../../components/Table/TableComponent";
import usePage from "../../../hooks/usePage";
import FilterCard from "./FilterCard";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import type { InboundFilterDTO } from "../../../@types/DTOs/InboundFilterDTO";
import type { CargoDetails } from "../../../@types/tables/CargoDetails";
import type { InboundDTO } from "../../../@types/DTOs/InboundDTO";
import { inboundService } from "../../../services/inboundService";
import dayjs from "dayjs";
import { handleMoney } from "../../../utils/handleMoney";
import { cargoDetailsService } from "../../../services/cargoDetailsService";
import { EMPTY_FILTER } from "./__constants__/EMPTY_FILTER";
import type { PickListDetailsRecordDTO } from "../../../@types/DTOs/PicklistDetailsRecordDTO";
import AddCartModal from "./AddCartModal";

export default function IndexPage() {
  const [addCartModalOpen, setAddCartModalOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<CargoDetails | null>(null);
  const [search, setSearch] = useState<InboundFilterDTO>(EMPTY_FILTER);
  const [pickListRecords, setPickListRecords] = useState<
    PickListDetailsRecordDTO[]
  >([]);
  const { title: pageTitle } = usePage();

  const {
    data: inboundPicklists,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["inboundPicklists", search],
    queryFn: async () => {
      return await inboundService.GetAll(search as InboundFilterDTO);
    },
    initialData: [],
  });

  const handleClickEdit = (record: InboundDTO) => {
    setSelectedData(record);
    setAddCartModalOpen(true);
  };

  const handleClickCancel = () => {
    setSelectedData(null);
    setAddCartModalOpen(false);
  };

  const handlePickListRecord = (values: PickListDetailsRecordDTO) => {
    setPickListRecords((prev) => [...prev, values]);
    setAddCartModalOpen(false);
  };

  const handleDelete = async (record: InboundDTO) => {
    if (!record.id) throw new Error("Id is null");
    await cargoDetailsService.Delete(record.id);
    await refetch();
    SweetAlert({
      title: "Successfully deleted.",
    });
  };

  const handleAfterSave = () => {
    setSelectedData(null);
    setAddCartModalOpen(false);
    refetch();
  };

  const handleSearch = async (value: InboundFilterDTO) => {
    await setSearch(value);
    await refetch();
  };

  const columns: TableProps<InboundDTO>["columns"] = [
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
      title: "Cubic Meter",
      dataIndex: "cubicMeter",
      key: "cubicMeter",
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
      render: (_, record) => (
        <div className="d-flex gap-1">
          <Tooltip title="Add to Pick List">
            <Button
              color="primary"
              shape="circle"
              variant="solid"
              icon={<PlusOutlined />}
              onClick={() => handleClickEdit(record)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      <AddCartModal
        open={addCartModalOpen}
        handlePickListRecords={handlePickListRecord}
        onCancel={handleClickCancel}
        selectedData={selectedData}
      />
      <FilterCard onSearch={handleSearch} />
      <Badge count={pickListRecords.length} size="small" offset={[0, 5]}>
        <Button icon={<ShoppingCartOutlined style={{ fontSize: 24 }} />}>
          {" "}
          Pending
        </Button>
      </Badge>

      <TableComponent<InboundDTO>
        headerTitle={pageTitle}
        columns={columns}
        dataSource={inboundPicklists}
        loading={isFetching}
      />
    </>
  );
}
