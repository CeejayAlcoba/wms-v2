import type { ColumnsType } from "antd/es/table";
import { Form, FormikProvider, useFormik } from "formik";
import { Button, Card, Popconfirm, Tooltip } from "antd";
import dayjs from "dayjs";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { PickListDetailsRecordDTO } from "../../../../@types/DTOs/PicklistDetailsRecordDTO.ts";
import type { ReportPickListDTO } from "../../../../@types/DTOs/ReportPickListDTO";
import usePage from "../../../../hooks/usePage";
import type { PickListDetails } from "../../../../@types/tables/PickListDetails";
import type { PickListDetailsDTO } from "../../../../@types/DTOs/PickListDetailsDTO";
import SweetAlert from "../../../../components/SweetAlert/SweetAlert";
import { pickListDetailsService } from "../../../../services/pickListDetailsService";
import { indexDbService } from "../../../../services/indexDbService";
import { EMPTY_PICKLIST_DETAILS } from "../__constants__/EMPTY_PICKLIST_DETAILS";
import ModalComponent from "../../../../components/ModalComponent/ModalComponent";
import AddPendingModal from "./AddPendingModal";
import InputFormik from "../../../../components/Formik/InputFormik";
import SelectFormik from "../../../../components/Formik/SelectFormik";
import type { RefTruckDetails } from "../../../../@types/tables/RefTruckDetails";
import TableComponent from "../../../../components/Table/TableComponent";

type ShowPendingModalProps = {
  open: boolean;
  picklistPendingRecords: PickListDetailsRecordDTO[];
  onRemoveRecord: (value: ReportPickListDTO | null) => void;
  onCancel: () => void;
  onAfterComplete: () => void;
};

export default function ShowPendingModal(props: ShowPendingModalProps) {
  const {
    open,
    onCancel,
    picklistPendingRecords,
    onRemoveRecord,
    onAfterComplete,
  } = props;
  const navigate = useNavigate();

  const { title: pageTitle } = usePage();
  const [records, setRecords] = useState<PickListDetailsRecordDTO[]>([]);
  const [selectedData, setSectedData] =
    useState<PickListDetailsRecordDTO | null>(null);
  const [openSavePendingModal, setOpenSavePendingModal] =
    useState<boolean>(false);
  const columns: ColumnsType<PickListDetailsRecordDTO> = [
    {
      title: "SKU",
      key: "skuCode",
      render: (_, record) => record.report?.skuCode,
    },
    {
      title: "PRO",
      key: "pro",
      render: (_, record) => record.report?.proNumber,
    },
    {
      title: "ICR Ref#",
      key: "icrReferenceNumber",
      render: (_, record) => record.report?.icrReferenceNumber,
    },
    {
      title: "Principal",
      key: "pro",
      render: (_, record) => record.report?.principal,
    },
    {
      title: "Product",
      key: "pro",
      render: (_, record) => record.report?.productCategory,
    },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Cubic Meter", dataIndex: "cubicMeter", key: "cubicMeter" },
    { title: "Pallete Count", dataIndex: "palleteCount", key: "palleteCount" },
    {
      title: "Pull-Out Date",
      dataIndex: "pullOutDate",
      key: "pullOutDate",
      render: (date) => (date ? dayjs(date).format("YYYY-MM-DD") : "-"),
    },
    {
      title: "Date Received",
      dataIndex: "pullOutDateRecieved",
      key: "pullOutDateRecieved",
      render: (date) => (date ? dayjs(date).format("YYYY-MM-DD") : "-"),
    },
    {
      title: "Delivery Due Date",
      dataIndex: "deliveryDueDate",
      key: "deliveryDueDate",
      render: (date) => (date ? dayjs(date).format("YYYY-MM-DD") : "-"),
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
            onConfirm={() => onRemoveRecord(record.report ?? null)}
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
  const handleComplete = async (values: PickListDetails) => {
    try {
      const combined: PickListDetailsDTO = {
        pickListDetails: values,
        pickListDetailsRecords: records,
      };
      const details = await pickListDetailsService.Add(combined);
      SweetAlert({
        title: `PL-${details.id}`,
        text: "Successfully Picked",
        showCancelButton: true,
        confirmButtonText: "Go to Good Issue",
        cancelButtonText: "Stay",
        showConfirmButton: true,
        showCloseButton: true,
        timer: undefined,
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/good-issue?id=${details.id}`);
        }
      });
      formik.resetForm();
      await indexDbService.clearAllItems("pendingPickList");
      onAfterComplete();
    } catch (e: any) {
      let ex: AxiosError = e;
      console.log(ex);

      SweetAlert({
        icon: "error",
        title: "Error",
        html: (ex.response?.data as string)?.replace(/\n/g, "<br>"),
        timer: undefined,
        showConfirmButton: true,
      });
    }
  };

  const handleClickEdit = (record: PickListDetailsRecordDTO) => {
    setSectedData(record);
    setOpenSavePendingModal(true);
  };
  const handleCancel = () => {
    onCancel();
    formik.resetForm();
  };
  const handleUpdate = async (value: PickListDetailsRecordDTO) => {
    const filtered = records.filter((r) => r.id != value.id);
    setRecords([...filtered, value]);
    setOpenSavePendingModal(false);
    SweetAlert({
      title: "Successfully updated",
    });
    await indexDbService.updateItem("pendingPickList", value.id ?? 0, {
      ...value,
      id: value.id ?? 0,
    });
  };
  const formik = useFormik({
    initialValues: EMPTY_PICKLIST_DETAILS,
    enableReinitialize: true,
    onSubmit: handleComplete,
  });

  useEffect(() => {
    setRecords(picklistPendingRecords);
  }, [open, picklistPendingRecords]);

  return (
    <ModalComponent
      width={1500}
      title={`Pendings ${pageTitle}`}
      open={open}
      onOk={() => formik.submitForm()}
      okText={"Complete"}
      confirmLoading={formik.isSubmitting}
      onCancel={handleCancel}
    >
      <AddPendingModal
        open={openSavePendingModal}
        onAfterSave={(val) => handleUpdate(val)}
        onCancel={() => setOpenSavePendingModal(false)}
        selectedData={selectedData}
        type="Update"
      />
      <Card>
        <FormikProvider value={formik}>
          <Form>
            <div className="row row-cols-lg-3">
              <InputFormik<PickListDetails> label="DO number" name="dONumber" />
              <InputFormik<PickListDetails>
                label="Delivered To"
                name="deliveredTo"
              />
              <InputFormik<PickListDetails> label="PO Number" name="pONumber" />
              <InputFormik<PickListDetails>
                label="Pick Up By"
                name="pickUpBy"
              />
              <InputFormik<PickListDetails> label="Remarks" name="remarks" />
              <InputFormik<PickListDetails> label="Sold To" name="soldTo" />
              <InputFormik<PickListDetails> label="Sales Man" name="salesMan" />
              <SelectFormik<PickListDetails, RefTruckDetails>
                label="Truck Plate Number"
                name="truckDetailsId"
                keyValue="id"
                keyLabel="plateNumber"
                option={[]}
              />
            </div>
          </Form>
        </FormikProvider>
      </Card>
      <TableComponent dataSource={records} columns={columns} rowKey="id" />;
    </ModalComponent>
  );
}
