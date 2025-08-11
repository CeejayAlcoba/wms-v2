import { Badge, Button, Tooltip, type TableProps } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { PlusOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import TableComponent from "../../../../components/Table/TableComponent";
import usePage from "../../../../hooks/usePage";

import type { ReportFilterDTO } from "../../../../@types/DTOs/ReportFilterDTO";
import type { ReportDTO } from "../../../../@types/DTOs/ReportDTO";
import { reportService } from "../../../../services/reportService";
import dayjs from "dayjs";
import { handleMoney } from "../../../../utils/handleMoney";
import { EMPTY_FILTER } from "../__constants__/EMPTY_FILTER";
import type { PickListDetailsRecordDTO } from "../../../../@types/DTOs/PicklistDetailsRecordDTO";
import { indexDbService } from "../../../../services/indexDbService";
import AddPendingModal from "./AddPendingModal";
import { EMPTY_PICKLIST_RECORD } from "../__constants__/EMPTY_PICKLIST_RECORD";
import ShowPendingModal from "./ShowPendingModal";
import FilterCard from "./FilterCard";

export default function PendingTable() {
  const [addPendingModalOpen, setAddPendingModalOpen] =
    useState<boolean>(false);
  const [showPendingModalOpen, setShowPendingModalOpen] =
    useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<ReportDTO | null>(null);
  const [search, setSearch] = useState<ReportFilterDTO>(EMPTY_FILTER);
  const [pickListPendingRecords, setPickListPendingRecords] = useState<
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
      return await reportService.GetAll(search as ReportFilterDTO);
    },
    initialData: [],
  });

  const handleClickAdd = (record: ReportDTO) => {
    setSelectedData(record);
    setAddPendingModalOpen(true);
  };

  const handleClickPending = () => {
    setShowPendingModalOpen(true);
  };

  const handleClickCancel = () => {
    setSelectedData(null);
    setAddPendingModalOpen(false);
  };

  const handlePickListRecord = (values: PickListDetailsRecordDTO) => {
    setPickListPendingRecords((prev) => [...prev, {...values, cargoDetailsId:values.report?.id}]);
    setAddPendingModalOpen(false);
  };

  const handleSearch = async (value: ReportFilterDTO) => {
    await setSearch(value);
    await refetch();
  };

  const handleRemoveRecord = async (value: ReportDTO|null) => {
     const filteredRecords = pickListPendingRecords.filter(p=>p.report?.id != value?.id);
     console.log(filteredRecords)
     await indexDbService.deleteItem("pendingPickList",value?.id??0)
     setPickListPendingRecords(filteredRecords);
     refetch();
  };
  const handleInitialPickListPendingRecord = async () => {
    const pendings = await indexDbService.getAllItems("pendingPickList");
    setPickListPendingRecords(pendings);
  };

  useEffect(() => {
    handleInitialPickListPendingRecord();
  }, []);

  const columns: TableProps<ReportDTO>["columns"] = [
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
      title: "GR",
      dataIndex: "goodsReceipt",
      key: "goodsReceipt",
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
      title: "Balance Pallete",
      dataIndex: "balancePalleteCount",
      key: "balancePalleteCount",
    },
    {
      title: "Balance Quantity",
      dataIndex: "balanceQuantity",
      key: "balanceQuantity",
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
      title: "Balance Cubic Meter",
      dataIndex: "balanceCubicMeter",
      key: "balanceCubicMeter",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (value) => handleMoney(value),
    },
   
    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (_, record) => (
        <div className="d-flex gap-1">
          {pickListPendingRecords.some((p) => p.report?.id == record.id) ? (
            <Badge count="Pending" status="processing" />
          ) : (
            <Tooltip title="Add to Pick List">
              <Button
                color="primary"
                shape="circle"
                variant="solid"
                icon={<PlusOutlined />}
                onClick={() => handleClickAdd(record)}
              />
            </Tooltip>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <AddPendingModal
        open={addPendingModalOpen}
        onAfterSave={handlePickListRecord}
        onCancel={handleClickCancel}
        selectedData={{
          ...EMPTY_PICKLIST_RECORD,
          report:selectedData
        }}
        type="Add"
      />
      <ShowPendingModal
        open={showPendingModalOpen}
        picklistPendingRecords={pickListPendingRecords}
        onCancel={() => setShowPendingModalOpen(false)}
        onRemoveRecord={(val)=>handleRemoveRecord(val)}
        onAfterComplete={() => {
          refetch();
          setShowPendingModalOpen(false);
          setPickListPendingRecords([]);
        }}
      />
      <FilterCard onSearch={handleSearch} />
      <div className="d-flex justify-content-end mt-2 mb-2">
        <Badge
          count={pickListPendingRecords.length}
          size="small"
          offset={[0, 5]}
        >
          <Button
            onClick={() => handleClickPending()}
            icon={<ShoppingCartOutlined style={{ fontSize: 24 }} />}
          >
            Pending
          </Button>
        </Badge>
      </div>

      <TableComponent<ReportDTO>
        headerTitle={pageTitle}
        columns={columns}
        dataSource={inboundPicklists}
        loading={isFetching}
      />
    </>
  );
}
