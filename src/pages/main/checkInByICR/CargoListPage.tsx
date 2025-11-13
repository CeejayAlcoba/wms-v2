import { FieldArray, useFormikContext } from "formik";
import type { CheckInByICRDTO } from "../../../@types/DTOs/CheckInByICRDTO";
import InputFormik from "../../../components/Formik/InputFormik";
import SelectFormik from "../../../components/Formik/SelectFormik";
import { Button, Collapse, Tooltip } from "antd";
import { EMPTY_CARGO } from "./__constants__/EMPTY_CARGO";
import type { RefUnitOfMeasurement } from "../../../@types/tables/RefUnitOfMeasurement";
import DatePickerFormik from "../../../components/Formik/DatePicker";
import InputNumberFormik from "../../../components/Formik/InputNumberFormik";
import type { ShelfDetails } from "../../../@types/tables/ShelfDetails";
import { useEffect, useState } from "react";
import { handleRoundOff } from "../../../utils/handleRoundOff";
import { DeleteOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { unitOfMeasurementService } from "../../../services/unitOfMeasurementService";
import ExcelHandler, {
  type ExcelColumn,
} from "../../../components/Documents/excel/ExcelHandler";
import type { CargoDetails } from "../../../@types/tables/CargoDetails";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import dayjs from "dayjs";
import { shelfDetailsService } from "../../../services/shelfDetailsService";
// import ExcelHandler from "../../../components/Documents/excel/ExcelHandler";

const { Panel } = Collapse;

type ExcelColumnType = {
  uom: string;
  shelfDetails: string;
} & CargoDetails;

export default function CargoListPage() {
  const { values, errors, touched, setValues } =
    useFormikContext<CheckInByICRDTO>();

  const [activeKey, setActiveKey] = useState<string[]>(["0"]);
  const onChange = (key: string | string[]) => {
    setActiveKey([...key]);
  };
  useEffect(() => {
    if (errors?.cargoDetails && Array.isArray(errors.cargoDetails)) {
      const keysWithErrors = errors.cargoDetails
        .map((err, index) => (err ? index.toString() : null))
        .filter((k): k is string => k !== null);

      if (keysWithErrors.length > 0) {
        setActiveKey(keysWithErrors);
      }
    }
  }, [errors.cargoDetails && touched.cargoDetails]);
  const { data: unitOfMeasurements } = useQuery({
    queryKey: ["unitOfMeasurements"],
    queryFn: async () => unitOfMeasurementService.GetAll(),
    initialData: [],
  });
  const { data: shelfDetails } = useQuery({
    queryKey: ["shelfDetails"],
    queryFn: async () => shelfDetailsService.GetAll(),
    initialData: [],
  });
  const formatColumns: ExcelColumn<ExcelColumnType>[] = [
    {
      label: "SKU",
      key: "skuCode",
      type: "string",
    },
    {
      label: "PRO Number",
      key: "proNumber",
      type: "string",
    },
    {
      label: "Description",
      key: "description",
      type: "string",
    },
    {
      label: "Delivery Note",
      key: "deliveryNote",
      type: "string",
    },
    {
      label: "UOM",
      key: "uom",
      type: "string",
    },
    {
      label: "Batch No",
      key: "batchNo",
      type: "string",
    },
    {
      label: "Expiration Date",
      key: "expirationDate",
      type: "date",
    },
    {
      label: "Pallete Count",
      key: "palleteCount",
      type: "number",
      validate: (value: number) => value > 0,
      invalidMessage: (label: string, row: number) =>
        `Ivalid ${label} in (row: ${row}), ${label} must more than 0`,
    },
    {
      label: "Quantity",
      key: "quantity",
      type: "number",
      validate: (value: number) => value > 0,
      invalidMessage: (label: string, row: number) =>
        `Invalid ${label} in (row: ${row}), ${label} must more than 0`,
    },
    {
      label: "Length (Cm)",
      key: "lengthCm",
      type: "number",
      validate: (value: number) => value > 0,
      invalidMessage: (label: string, row: number) =>
        `Invalid ${label} in (row: ${row}), ${label} must more than 0`,
    },
    {
      label: "Height (Cm)",
      key: "heightCm",
      type: "number",
      validate: (value: number) => value > 0,
      invalidMessage: (label: string, row: number) =>
        `Invalid ${label} in (row: ${row}), ${label} must more than 0`,
    },
    {
      label: "Width (Cm)",
      key: "widthCm",
      type: "number",
      validate: (value: number) => value > 0,
      invalidMessage: (label: string, row: number) =>
        `Invalid ${label} in (row: ${row}), ${label} must more than 0`,
    },
    {
      label: "Customer Name",
      key: "customerName",
      type: "string",
    },
    {
      label: "Storage Location",
      key: "shelfDetails",
      type: "string",
    },
    {
      label: "Total Amount",
      key: "totalAmount",
      type: "number",
    },
  ];

  const handleUpload = (records: ExcelColumnType[]) => {
    console.log(records);

    const newCargoDetails = records.map((r) => ({
      description: r?.description ?? "",
      skuCode: r?.skuCode ?? "",
      proNumber: r?.proNumber ?? null,
      deliveryNote: r?.deliveryNote ?? null,
      unitOfMeasurementId:
        unitOfMeasurements?.find(
          (f) => f.name?.replace(/\s/g, "") === r.uom?.replace(/\s/g, "")
        )?.id || null,
      batchNo: r?.batchNo ?? null,
      expirationDate: r?.expirationDate
        ? dayjs(r?.expirationDate).format("YYYY-MM-DD")
        : null,
      palleteCount: r?.palleteCount ?? null,
      quantity: r?.quantity ?? null,
      lengthCm: r?.lengthCm ?? null,
      heightCm: r?.heightCm ?? null,
      widthCm: r?.widthCm ?? null,
      cubicMeter: r?.cubicMeter ?? null,
      customerName: r?.customerName ?? null,
      shelfDetailsId:
        shelfDetails?.find(
          (f) =>
            f.name?.replace(/\s/g, "") === r.shelfDetails?.replace(/\s/g, "")
        )?.id || null,
      totalAmount: r?.totalAmount ?? null,
      bookingDetailsId: r?.bookingDetailsId ?? null,
    }));

    setValues((prev) => ({
      ...prev,
      cargoDetails: [...prev.cargoDetails, ...newCargoDetails],
    }));
  };

  return (
    <>
      <ExcelHandler<ExcelColumnType>
        className="mb-2 d-flex justify-content-end"
        columns={formatColumns}
        data={[]}
        onUpload={handleUpload}
        onInvalidUpload={(messages: string[]) => {
          SweetAlert({
            icon: "error",
            title: "Invalid Format",

            html: messages.join("<br/>"),
            width: 600,
            timer: undefined,
            showConfirmButton: true,
          });
        }}
      />
      <FieldArray name="cargoDetails">
        {({ push, remove }) => (
          <>
            <Collapse activeKey={activeKey} onChange={onChange}>
              {values.cargoDetails.map((cargo, index) => {
                return (
                  <Panel
                    header={
                      <div className="d-flex justify-content-between">
                        <div>
                          {index + 1}. {cargo.skuCode ?? ""}
                        </div>
                        <Tooltip title="Remove">
                          <Button
                            icon={<DeleteOutlined />}
                            danger
                            type="link"
                            onClick={() => remove(index)}
                          />
                        </Tooltip>
                      </div>
                    }
                    key={index}
                  >
                    <CargoForm
                      arrayName={`cargoDetails[${index}]`}
                      index={index}
                      unitOfMeasurements={unitOfMeasurements}
                      shelfDetails={shelfDetails}
                    />
                  </Panel>
                );
              })}
            </Collapse>

            <Button
              type="primary"
              style={{ marginTop: 12 }}
              onClick={() => {
                push(EMPTY_CARGO);
                const nextIndex = values.cargoDetails.length.toString();
                setActiveKey([nextIndex]);
              }}
            >
              Add Cargo
            </Button>
          </>
        )}
      </FieldArray>
    </>
  );
}

function CargoForm(props: {
  arrayName: string;
  index: number;
  unitOfMeasurements: RefUnitOfMeasurement[];
  shelfDetails: ShelfDetails[];
}) {
  const { arrayName, unitOfMeasurements, shelfDetails } = props;

  const { getFieldProps, setFieldValue } = useFormikContext<CheckInByICRDTO>();

  useEffect(() => {
    const lengthCm = Number(getFieldProps(`${arrayName}.lengthCm`).value || 0);
    const heightCm = Number(getFieldProps(`${arrayName}.heightCm`).value || 0);
    const widthCm = Number(getFieldProps(`${arrayName}.widthCm`).value || 0);
    const quantity = Number(getFieldProps(`${arrayName}.quantity`).value || 0);

    const cbm =
      (lengthCm / 100) * (heightCm / 100) * (widthCm / 100) * quantity;

    setFieldValue(`${arrayName}.cubicMeter`, handleRoundOff(cbm));
  }, [
    getFieldProps(`${arrayName}.lengthCm`).value,
    getFieldProps(`${arrayName}.heightCm`).value,
    getFieldProps(`${arrayName}.widthCm`).value,
    getFieldProps(`${arrayName}.quantity`).value,
  ]);

  return (
    <div className="row row-cols-lg-4">
      <InputFormik<any> label="SKU" name={`${arrayName}.skuCode`} askterisk />
      <InputFormik<any>
        label="PRO Number"
        name={`${arrayName}.proNumber`}
        askterisk
      />
      <InputFormik<any>
        label="Description"
        name={`${arrayName}.description`}
        askterisk
      />
      <InputFormik<any>
        label="Delivery Note"
        name={`${arrayName}.deliveryNote`}
      />
      <SelectFormik<any, RefUnitOfMeasurement>
        label="Unit of packaging"
        name={`${arrayName}.unitOfMeasurementId`}
        keyValue="id"
        keyLabel="name"
        option={unitOfMeasurements}
        askterisk
      />
      <InputFormik<any> label="Batch No" name={`${arrayName}.batchNo`} />
      <DatePickerFormik<any>
        label="Expiration Date"
        name={`${arrayName}.expirationDate`}
        askterisk
      />
      <InputNumberFormik<any>
        label="Pallete Count"
        name={`${arrayName}.palleteCount`}
        askterisk
      />
      <InputNumberFormik<any>
        label="quantity"
        name={`${arrayName}.quantity`}
        askterisk
      />

      <InputNumberFormik<any>
        label="length"
        name={`${arrayName}.lengthCm`}
        addonAfter="cm"
        askterisk
      />

      <InputNumberFormik<any>
        label="height"
        name={`${arrayName}.heightCm`}
        addonAfter="cm"
        askterisk
      />
      <InputNumberFormik<any>
        label="width"
        name={`${arrayName}.widthCm`}
        addonAfter="cm"
        askterisk
      />

      <InputNumberFormik<any>
        label="CBM (Volume)"
        name={`${arrayName}.cubicMeter`}
        askterisk
        disabled
      />
      <InputFormik<any>
        label="Customer Name"
        name={`${arrayName}.customerName`}
      />
      <SelectFormik<any, ShelfDetails>
        label="Storage location"
        name={`${arrayName}.shelfDetailsId`}
        keyValue="id"
        keyLabel="name"
        option={shelfDetails}
      />
      <InputNumberFormik<any>
        prefix="₱"
        label="Total Amount"
        name={`${arrayName}.totalAmount`}
        placeholder="0.00"
        askterisk
        onChange={(value) => {
          const money = (value as number).toFixed(2);
          setFieldValue(`${arrayName}.totalAmount`, money);
        }}
      />
    </div>
  );
}
