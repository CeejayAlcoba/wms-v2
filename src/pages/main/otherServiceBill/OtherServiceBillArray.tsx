import { Button, Card } from "antd";
import { FieldArray, useFormikContext } from "formik";
import type { BillingStatementWithServiceReportDTO } from "../../../@types/DTOs/BillingStatementWithServiceReportDTO";
import { useQuery } from "@tanstack/react-query";
import { serviceConfigService } from "../../../services/serviceConfigService";
import SelectFormik from "../../../components/Formik/SelectFormik";
import type { RefServiceConfig } from "../../../@types/tables/RefServiceConfig";
import InputFormik from "../../../components/Formik/InputFormik";
import type { OtherServiceBill } from "../../../@types/tables/OtherServiceBill";
import handleEvaluate from "../../../utils/handleEvaluate";
import { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import type { OtherServiceBillDTO } from "../../../@types/DTOs/OtherServiceBillDTO";
import { serviceFieldService } from "../../../services/serviceFieldService";
import type { RefServiceField } from "../../../@types/tables/RefServiceField";
import InputNumberFormik from "../../../components/Formik/InputNumberFormik";
import { EMPTY_SERVICE } from "./__contants__/EMPTY_SERVICE";
import DatePickerFormik from "../../../components/Formik/DatePicker";

const otherServiceBillsKey: keyof BillingStatementWithServiceReportDTO =
  "otherServiceBills";
const totalAmount: keyof OtherServiceBillDTO = "totalAmount";
const date: keyof OtherServiceBillDTO = "date";
const serviceFieldsKey: keyof OtherServiceBillDTO = "serviceFields";

export default function OtherServiceBillArray() {
  const { values } = useFormikContext<BillingStatementWithServiceReportDTO>();

  const { data: otherServices } = useQuery({
    queryKey: ["otherServices"],
    queryFn: async () => await serviceConfigService.GetAll(),
    initialData: [],
  });

  return (
    <FieldArray name={otherServiceBillsKey}>
      {({ push, remove }) => (
        <>
          <div className="row row-cols-lg-2">
            {values.otherServiceBills?.map(
              (record: OtherServiceBill, index) => (
                <div className="mb-2">
                  <OtherServiceBillRow
                    key={index}
                    record={record}
                    index={index}
                    remove={remove}
                    otherServices={otherServices}
                  />
                </div>
              )
            )}
          </div>
          <Button
            type="primary"
            style={{ marginTop: 12 }}
            onClick={() => push(EMPTY_SERVICE)}
          >
            Add Service
          </Button>
        </>
      )}
    </FieldArray>
  );
}

type RowProps = {
  record: OtherServiceBill;
  remove: <X = any>(index: number) => X | undefined;
  index: number;
  otherServices: RefServiceConfig[];
};

function OtherServiceBillRow({
  record,
  remove,
  index,
  otherServices,
}: RowProps) {
  const { values, setFieldValue } =
    useFormikContext<BillingStatementWithServiceReportDTO>();

  const [fields, setFields] = useState<RefServiceField[]>([]);
  const [formula, setFormula] = useState<string>("");
  useEffect(() => {
    const newFields =
      values.otherServiceBills?.[index]?.serviceFields?.map((field) => ({
        ...field,
        value: field.value || null,
        serviceFieldId: field.id,
        serviceConfigId:
          values.otherServiceBills?.[index].serviceConfig?.id || 0,
      })) || [];

    setFields(newFields);
    setFormula(values.otherServiceBills?.[index]?.serviceConfig?.formula ?? "");
  }, [record.serviceConfigId, otherServices]);

  const handleFieldInput = (val: number, field: RefServiceField) => {
    const updated = fields.map((f) =>
      f.id === field.id ? { ...f, value: val ?? null } : f
    );
    handleFields(updated);
    handleTotalAmount(updated);
  };

  const handleTotalAmount = (updatedFields?: RefServiceField[]) => {
    const context: Record<string, number> = {};
    (updatedFields ?? fields).forEach((f) => {
      if (f.jsonKey) context[f.jsonKey] = f.value ?? 0;
    });

    const result = handleEvaluate(formula, context);
    setFieldValue(
      `${otherServiceBillsKey}[${index}].${totalAmount}`,
      result.toFixed(2)
    );
  };
  const handleFields = (newFields: RefServiceField[]) => {
    setFieldValue(
      `${otherServiceBillsKey}[${index}].${serviceFieldsKey}`,
      newFields
    );
    setFields(newFields);
  };

  const handleOnSelect = async (id?: number) => {
    if (!id) {
      handleFields([]);
      return;
    }
    const data = await serviceFieldService.GetByServiceConfigId(id);
    const service = otherServices.find((o) => o.id === id);
    const newFields: RefServiceField[] =
      data.map((d) => ({
        ...d,
        value: null,
      })) ?? [];
    setFormula(service?.formula ?? "");
    handleFields(newFields);
  };

  return (
    <Card>
      <div className="d-flex justify-content-between">
        <strong>Service {index + 1}</strong>
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => remove(index)}
        />
      </div>
      <SelectFormik<any, RefServiceConfig>
        name={`${otherServiceBillsKey}[${index}].serviceConfigId`}
        keyValue="id"
        keyLabel="name"
        option={otherServices}
        onChange={(value) => handleOnSelect(value)}
      />
      <DatePickerFormik<any>
        askterisk
        label="Date"
        readOnly
        name={`${otherServiceBillsKey}[${index}].${date}`}
      />
      <div className="row row-cols-lg-3">
        {fields.map((field, indexField) => (
          <div key={field.id}>
            <InputNumberFormik<any>
              label={field.name ?? ""}
              name={`${otherServiceBillsKey}[${index}].${serviceFieldsKey}[${indexField}].value`}
              askterisk
              style={{ width: "100%" }}
              onChange={(val) => handleFieldInput(val as number, field)}
            />
          </div>
        ))}
      </div>
      <InputFormik<any>
        prefix={<span>₱</span>}
        askterisk
        label="Amount"
        readOnly
        name={`${otherServiceBillsKey}[${index}].${totalAmount}`}
      />
    </Card>
  );
}
