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
import { handleMoney } from "../../../utils/handleMoney";
import { DeleteOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { unitOfMeasurementService } from "../../../services/unitOfMeasurementService";

const { Panel } = Collapse;

export default function CargoListPage() {
  const { values } = useFormikContext<CheckInByICRDTO>();

  const [activeKey, setActiveKey] = useState<string[]>(["0"]);
  const onChange = (key: string | string[]) => {
    setActiveKey([...key]);
  };

  return (
    <FieldArray name="cargoDetails">
      {({ push, remove }) => (
        <>
          <Collapse activeKey={activeKey} onChange={onChange}>
            {values.cargoDetails.map((cargo, index) => {
              const arrayName = `cargoDetails[${index}]`;

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
                  <CargoForm arrayName={arrayName} />
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
  );
}

function CargoForm(props: { arrayName: string }) {
  const { arrayName } = props;

  const { getFieldProps, setFieldValue } = useFormikContext<CheckInByICRDTO>();

  useEffect(() => {
    const lengthCm = Number(getFieldProps(`${arrayName}.lengthCm`).value || 0);
    const heightCm = Number(getFieldProps(`${arrayName}.heightCm`).value || 0);
    const widthCm = Number(getFieldProps(`${arrayName}.widthCm`).value || 0);
    const quantity = Number(getFieldProps(`${arrayName}.quantity`).value || 0);

    const cbm =
      (lengthCm / 100) * (heightCm / 100) * (widthCm / 100) * quantity;

    console.log(cbm);
    setFieldValue(`${arrayName}.cubicMeter`, handleRoundOff(cbm));
  }, [
    getFieldProps(`${arrayName}.lengthCm`).value,
    getFieldProps(`${arrayName}.heightCm`).value,
    getFieldProps(`${arrayName}.widthCm`).value,
    getFieldProps(`${arrayName}.quantity`).value,
  ]);

  const { data: unitOfMeasurements } = useQuery({
    queryKey: ["unitOfMeasurements"],
    queryFn: async () => unitOfMeasurementService.GetAll(),
    initialData: [],
  });
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
      <InputFormik<any>
        label="Batch No"
        name={`${arrayName}.batchNo`}
      />
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
      <InputNumberFormik<any>
        label="Customer Name"
        name={`${arrayName}.customerName`}
      />
      <SelectFormik<any, ShelfDetails>
        label="Storage location"
        name={`${arrayName}.shelfDetailsId`}
        keyValue="id"
        keyLabel="name"
        option={[]}
      />
      <InputNumberFormik<any>
        prefix="₱"
        label="Total Amount"
        name={`${arrayName}.totalAmount`}
        placeholder="0.00"
        askterisk
        onChange={(value) => {
          const money = handleMoney(value as number);
          setFieldValue(`${arrayName}.totalAmount`, money);
        }}
      />
    </div>
  );
}
