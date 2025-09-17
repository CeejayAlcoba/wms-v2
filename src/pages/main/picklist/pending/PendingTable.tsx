import { Badge, Button, Tooltip, type TableProps } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { PlusOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import TableComponent from "../../../../components/Table/TableComponent";
import usePage from "../../../../hooks/usePage";
import type { ReportPickListDTO } from "../../../../@types/DTOs/ReportPickListDTO";
import { reportService } from "../../../../services/reportService";
import dayjs from "dayjs";
import { handleMoney } from "../../../../utils/handleMoney";
import { EMPTY_FILTER } from "../__constants__/EMPTY_FILTER";
import type { PickListDetailsRecordDTO } from "../../../../@types/DTOs/PickListDetailsRecordDTO";
import { indexDbService } from "../../../../services/indexDbService";
import { EMPTY_PICKLIST_RECORD } from "../__constants__/EMPTY_PICKLIST_RECORD";
import ShowPendingModal from "./ShowPendingModal";
import FilterCard from "./FilterCard";
import type { ReportPickListFilterDTO } from "../../../../@types/DTOs/ReportPickListFilterDTO";
import TableTotalFooter from "../../../../components/Table/TableTotalFooter";
import { TABLE_TOTAL_FOOTER } from "../../../../constants/TABLE_TOTAL_FOOTER";
import SavePickListRecordDetailsModal from "../SavePickListRecordDetailsModal";

export default function PendingTable() {
  const [savePickListDetailsRecordModal, setSavePickListDetailsRecordModalOpen] =
    useState<boolean>(false);
  const [showPendingModalOpen, setShowPendingModalOpen] =
    useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<ReportPickListDTO | null>(
    null
  );
  const [search, setSearch] = useState<ReportPickListFilterDTO>(EMPTY_FILTER);
  const [pickListPendingRecords, setPickListPendingRecords] = useState<
    PickListDetailsRecordDTO[]
  >([]);
  const { title: pageTitle } = usePage();

  const {
    data: pickLists,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["pickLists", search],
    queryFn: async () => {
      return await reportService.PickListGetAll(search);
    },
    initialData: [],
  });

  const handleClickAdd = (record: ReportPickListDTO) => {
    setSelectedData(record);
    setSavePickListDetailsRecordModalOpen(true);
  };

  const handleClickPending = () => {
    setShowPendingModalOpen(true);
  };

  const handleClickCancel = () => {
    setSelectedData(null);
    setSavePickListDetailsRecordModalOpen(false);
  };

  const handlePickListRecord = (values: PickListDetailsRecordDTO) => {
    setPickListPendingRecords((prev) => [
      ...prev,
      { ...values, cargoDetailsId: values.report?.id },
    ]);
    setSavePickListDetailsRecordModalOpen(false);
  };

  const handleSearch = async (value: ReportPickListFilterDTO) => {
    await setSearch(value);
    await refetch();
  };

  const handleRemoveRecord = async (value: ReportPickListDTO | null) => {
    const filteredRecords = pickListPendingRecords.filter(
      (p) => p.report?.id != value?.id
    );
    console.log(filteredRecords);
    await indexDbService.deleteItem("pendingPickList", value?.id ?? 0);
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

  const columns: TableProps<ReportPickListDTO>["columns"] = [
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
      title: "Balance CBM",
      dataIndex: "balanceCubicMeter",
      key: "balanceCubicMeter",
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
      <SavePickListRecordDetailsModal
        status={"Pending"}    
        open={savePickListDetailsRecordModal}
        onAfterSave={handlePickListRecord}
        onCancel={handleClickCancel}
        selectedData={{
          ...EMPTY_PICKLIST_RECORD,
          report: selectedData,
        }}
        type="Add"
      />
      <ShowPendingModal
        open={showPendingModalOpen}
        picklistPendingRecords={pickListPendingRecords}
        onCancel={() => setShowPendingModalOpen(false)}
        onRemoveRecord={(val) => handleRemoveRecord(val)}
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

      <TableComponent<ReportPickListDTO>
        headerTitle={pageTitle}
        columns={columns}
        dataSource={pickLists}
        loading={isFetching}
        print={{ onBeforePrint: async () => await handleUnpaginate() }}
        pdf={{ onChange: async () => await handleUnpaginate() }}
        pagination={{
          total: pickLists?.[0]?.totalItems,
          onChange: handlePaginate,
          current: search.currentPage ?? 1,
          pageSize: search.pageSize ?? 10,
        }}
        footer={() => (
          <TableTotalFooter<ReportPickListDTO>
            data={pickLists}
            values={TABLE_TOTAL_FOOTER}
          />
        )}
      />
    </>
  );
}
