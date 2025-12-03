import { FieldArray, useFormikContext } from "formik";
import type { CheckInByICRDTO } from "../../../@types/DTOs/CheckInByICRDTO";
import InputFormik from "../../../components/Formik/InputFormik";
import SelectFormik from "../../../components/Formik/SelectFormik";
import { Button, Collapse, Popconfirm, Tag, Tooltip } from "antd";
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
import Checkbox from "antd/es/checkbox/Checkbox";
import { IS_MANUAL_CBM } from "../../../constants/LOCAL_STORAGE_KEYS";
import handleCaculateCBM from "./__utils__/handleCalculateCBM";
import React from "react";
// import ExcelHandler from "../../../components/Documents/excel/ExcelHandler";

const { Panel } = Collapse;

type ExcelColumnType = {
  uom: string;
  shelfDetails: string;
} & CargoDetails;

export default function CargoListPage() {
  const { values, errors, touched, setValues, setFieldValue } =
    useFormikContext<CheckInByICRDTO>();

  const [activeKey, setActiveKey] = useState<string[]>(["0"]);
  const [isManualAllCbm, setIsManualAllCbm] = useState<boolean>(
    localStorage.getItem(IS_MANUAL_CBM) == "YES"
  );
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

  const handleManualAllCbm = (value: boolean) => {
    localStorage.setItem(IS_MANUAL_CBM, value ? "YES" : "NO");
    setIsManualAllCbm(value);
    setFieldValue(
      "cargoDetails",
      values.cargoDetails.map((c) => ({ ...c, isManualCbm: value }))
    );
  };

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
      label: "CBM (Manual)",
      key: "cubicMeter",
      type: "number",
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
      palleteCount: r?.palleteCount || null,
      quantity: r?.quantity || null,
      lengthCm: r?.lengthCm || null,
      heightCm: r?.heightCm || null,
      widthCm: r?.widthCm || null,
      cubicMeter: isManualAllCbm
        ? handleRoundOff(r?.cubicMeter ?? 0)
        : handleCaculateCBM({
            lengthCm: r.lengthCm,
            heightCm: r.heightCm,
            widthCm: r.widthCm,
            quantity: r.quantity,
          }),
      customerName: r?.customerName ?? null,
      shelfDetailsId:
        shelfDetails?.find(
          (f) =>
            f.name?.replace(/\s/g, "") === r.shelfDetails?.replace(/\s/g, "")
        )?.id || null,
      totalAmount: r?.totalAmount || null,
      bookingDetailsId: r?.bookingDetailsId ?? null,
      isManualCbm: isManualAllCbm,
    }));

    setValues((prev) => ({
      ...prev,
      cargoDetails: [...prev.cargoDetails, ...newCargoDetails],
    }));
  };

  return (
    <>
      <div className="row mb-1">
        <div className="col d-flex justify-content-between align-items-center gap-3">
          {!!isManualAllCbm ? (
            <Tag color="orange">Manual Cbm</Tag>
          ) : (
            <Tag color="blue">Auto Cbm</Tag>
          )}
          <div className="d-flex align-items-center">
            <Checkbox
              checked={isManualAllCbm}
              onChange={(e) => handleManualAllCbm(e.target.checked)}
            >
              Manual All Cbm
            </Checkbox>
            <ExcelHandler<ExcelColumnType>
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
            <Popconfirm
              title={"Do you want to clear all items?"}
              onConfirm={() => {
                setFieldValue("cargoDetails", []);
              }}
            >
              <Button>Clear All</Button>
            </Popconfirm>
          </div>
        </div>
      </div>

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
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <Tooltip title="Remove">
                            <Button
                              icon={<DeleteOutlined />}
                              danger
                              type="link"
                              onClick={() => remove(index)}
                            />
                          </Tooltip>
                        </div>
                      </div>
                    }
                    key={index}
                  >
                    <CargoForm
                      cargo={cargo}
                      arrayName={`cargoDetails[${index}]`}
                      index={index}
                      unitOfMeasurements={unitOfMeasurements}
                      shelfDetails={shelfDetails}
                      isManualAllCbm={isManualAllCbm}
                    />
                  </Panel>
                );
              })}
            </Collapse>

            <Button
              type="primary"
              style={{ marginTop: 12 }}
              onClick={() => {
                push({ ...EMPTY_CARGO, isManualCbm: isManualAllCbm });
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

const CargoForm = React.memo(
  function CargoForm(props: {
    arrayName: string;
    cargo: CargoDetails;
    index: number;
    unitOfMeasurements: RefUnitOfMeasurement[];
    shelfDetails: ShelfDetails[];
    isManualAllCbm: boolean;
  }) {
    const {
      arrayName,
      unitOfMeasurements,
      shelfDetails,
      isManualAllCbm,
      cargo,
    } = props;
    const { setFieldValue } = useFormikContext<CheckInByICRDTO>();

    const calculateCbmField = (value?: number, key?: string) => {
      if (isManualAllCbm) return;
      const values: any = {
        lengthCm: cargo.lengthCm,
        heightCm: cargo.heightCm,
        widthCm: cargo.widthCm,
        quantity: cargo.quantity,
      };
      if (key) {
        values[key] = value;
      }

      const cbm = handleCaculateCBM(values);
      setFieldValue(`${arrayName}.cubicMeter`, cbm);
    };

    useEffect(() => {
      calculateCbmField();
    }, [isManualAllCbm]);

    return (
      <div className="row row-cols-lg-4">
        <InputFormik<any> label="SKU" name={`${arrayName}.skuCode`} askterisk />
        <InputFormik<any> label="PRO Number" name={`${arrayName}.proNumber`} />
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
        />
        <InputNumberFormik<any>
          label="Pallete Count"
          name={`${arrayName}.palleteCount`}
        />
        <InputNumberFormik<any>
          label="quantity"
          name={`${arrayName}.quantity`}
          onChange={(value) => calculateCbmField(Number(value), "quantity")}
          askterisk
        />

        <InputNumberFormik<any>
          label="length"
          name={`${arrayName}.lengthCm`}
          addonAfter="cm"
          onChange={(value) => calculateCbmField(Number(value), "lengthCm")}
          askterisk
        />

        <InputNumberFormik<any>
          label="height"
          name={`${arrayName}.heightCm`}
          addonAfter="cm"
          onChange={(value) => calculateCbmField(Number(value), "heightCm")}
          askterisk
        />
        <InputNumberFormik<any>
          label="width"
          name={`${arrayName}.widthCm`}
          onChange={(value) => calculateCbmField(Number(value), "widthCm")}
          addonAfter="cm"
          askterisk
        />

        <InputNumberFormik<any>
          label="CBM (Volume)"
          name={`${arrayName}.cubicMeter`}
          askterisk
          onChange={(value) => handleRoundOff(Number(value))}
          disabled={!cargo.isManualCbm}
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
          onChange={(value) => {
            const money = (value as number).toFixed(2);
            setFieldValue(`${arrayName}.totalAmount`, money);
          }}
        />
      </div>
    );
  },
  (prev, next) => {
    return (
      prev.cargo === next.cargo && prev.isManualAllCbm === next.isManualAllCbm
    );
  }
);
