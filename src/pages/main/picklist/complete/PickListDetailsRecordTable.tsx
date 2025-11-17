import { Button, Popconfirm, Tooltip, type TableProps } from "antd";
import dayjs from "dayjs";
import type { PickListDetailsRecordGetDTO } from "../../../../@types/DTOs/PickListDetailsRecordGetDTO";
import TableComponent from "../../../../components/Table/TableComponent";
import {
  GridList,
  type GridListColumnsProps,
} from "../../../../components/Grid/GridList";
import type { PickListDetailsGetDTO } from "../../../../@types/DTOs/PickListDetailsGetDTO";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { reportService } from "../../../../services/reportService";
import { useState } from "react";
import type { ReportPickListDTO } from "../../../../@types/DTOs/ReportPickListDTO";

import type { PickListDetailsRecord } from "../../../../@types/tables/PickListDetailsRecord";
import SweetAlert from "../../../../components/SweetAlert/SweetAlert";
import type { PickListDetailsRecordDTO } from "../../../../@types/DTOs/PickListDetailsRecordDTO";
import { pickListDetailsRecordService } from "../../../../services/pickListDetailsRecordService";
import SavePickListRecordDetailsModal from "../SavePickListRecordDetailsModal";

export default function PickListDetailsRecordTable(props: {
  setPickListRecords: React.Dispatch<
    React.SetStateAction<PickListDetailsRecordGetDTO[]>
  >;
  pickListRecords: PickListDetailsRecordGetDTO[];
  record: PickListDetailsGetDTO;
}) {
  const { pickListRecords, record, setPickListRecords } = props;

  const [pickList, setPickList] = useState<ReportPickListDTO | null>(null);
  const [selectedDetails, setSelectedDetails] =
    useState<PickListDetailsRecord | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openSaveModal, setOpenSaveModal] = useState<boolean>(false);

  const handleClickEdit = async (value: PickListDetailsRecordGetDTO) => {
    try {
      setOpenSaveModal(true);
      setIsLoading(true);
      const res = await reportService.PickListGetAll({
        id: value.cargoDetailsId,
        allowZeroBalance:true
      });
      console.log(res)
      setPickList(res?.[0] ?? null);
      setSelectedDetails(value);
    } catch {
      SweetAlert({
        icon: "error",
        timer: undefined,
        title: "Something went wrong.",
        showConfirmButton: true,
      });
      setOpenSaveModal(false);
    }
    setIsLoading(false);
  };

  const handleDelete = async (record: PickListDetailsRecordGetDTO) => {
    try {
      await pickListDetailsRecordService.Delete(record.id ?? 0);
      SweetAlert({ title: "Successfully deleted." });
      setPickListRecords((prev) => prev.filter((p) => p.id !== record.id));
    } catch (e: any) {
      SweetAlert({
        icon: "error",
        timer: undefined,
        showConfirmButton: true,
        title: "Something went wrong!",
      });
    }
  };

  const handleCancel = () => {
    setOpenSaveModal(false);
  };
  const handleAfterSave = (value: PickListDetailsRecordDTO) => {
    setPickListRecords((prev) =>
      prev.map((p) => {
        if (p.id == value.id) return value;
        return p;
      })
    );
    setOpenSaveModal(false);
  };

  const columns: TableProps<PickListDetailsRecordGetDTO>["columns"] = [
    { title: "SKU Code", dataIndex: "skuCode", key: "skuCode" },
    { title: "PRO Number", dataIndex: "proNumber", key: "proNumber" },
    {
      title: "ICR Reference No",
      dataIndex: "icrReferenceNumber",
      key: "icrReferenceNumber",
    },
    { title: "Principal", dataIndex: "principal", key: "principal" },
    {
      title: "Product Category",
      dataIndex: "productCategory",
      key: "productCategory",
    },
    { title: "Goods Receipt", dataIndex: "goodsReceipt", key: "goodsReceipt" },
    {
      title: "Pull Out Date",
      dataIndex: "pullOutDate",
      key: "pullOutDate",
      render: (date: Date | null) =>
        date ? dayjs(date).format("YYYY-MM-DD") : "",
    },
    {
      title: "Pull Out Date Received",
      dataIndex: "pullOutDateRecieved",
      key: "pullOutDateRecieved",
      render: (date: Date | null) =>
        date ? dayjs(date).format("YYYY-MM-DD") : "",
    },
    {
      title: "Delivery Due Date",
      dataIndex: "deliveryDueDate",
      key: "deliveryDueDate",
      render: (date: Date | null) =>
        date ? dayjs(date).format("YYYY-MM-DD") : "",
    },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Cubic Meter", dataIndex: "cubicMeter", key: "cubicMeter" },
    { title: "Pallet Count", dataIndex: "palleteCount", key: "palleteCount" },
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

  const gridColumns: GridListColumnsProps<PickListDetailsGetDTO> = [
    {
      key: "id",
      label: "PL",
    },
    {
      key: "goodIssue",
      label: "GI",
    },
    {
      key: "ocr",
      label: "OCR",
    },
    {
      key: "remarks",
      label: "Remarks",
    },
    {
      key: "soldTo",
      label: "Sold To",
    },
    {
      key: "deliveredTo",
      label: "Delivered To",
    },
    {
      key: "pickUpBy",
      label: "Pick Up By",
    },
    {
      key: "poNumber",
      label: "PO Number",
    },
    {
      key: "doNumber",
      label: "DO Number",
    },
    {
      key: "salesMan",
      label: "Salesman",
    },
  ];

  return (
    <div>
      <SavePickListRecordDetailsModal
        loading={isLoading}
        open={openSaveModal}
        onAfterSave={handleAfterSave}
        onCancel={handleCancel}
        selectedData={{ report: pickList, ...selectedDetails }}
        type={"Update"}
        status={"Completed"}
      />
      <TableComponent<PickListDetailsRecordGetDTO>
        headerTitle="Picklist Details"
        title={() => (
          <GridList<PickListDetailsGetDTO>
            data={record}
            columns={gridColumns}
            cols={3}
          />
        )}
        dataSource={pickListRecords?.filter(
          (p) => p.pickListDetailsId == record?.id
        )}
        columns={columns}
        rowKey="id"
        bordered
        pagination={false}
      />
    </div>
  );
}
