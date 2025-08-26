import { Button, Card, InputNumber } from "antd";
import { FieldArray, useFormikContext } from "formik";
import type { BillingStatementWithServiceReportDTO } from "../../../@types/DTOs/BillingStatementWithServiceReportDTO";
import { useQuery } from "@tanstack/react-query";
import { otherServiceService } from "../../../services/otherServiceService";
import { EMPTY_FORM } from "./__contants__/EMPTY_FORM";
import SelectFormik from "../../../components/Formik/SelectFormik";
import type { RefOtherService } from "../../../@types/tables/RefOtherService";
import InputFormik from "../../../components/Formik/InputFormik";
import type { OtherServiceReports } from "../../../@types/tables/OtherServiceReports";
import type { RefOtherServiceField } from "../../../@types/tables/RefOtherServiceField";
import handleEvaluate from "../../../utils/handleEvaluate";
import { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { handleMoney } from "../../../utils/handleMoney";

export default function OtherServiceReportArray() {
  const otherServiceReportsKey: keyof BillingStatementWithServiceReportDTO =
    "otherServiceReports";
  const { values, setFieldValue } =
    useFormikContext<BillingStatementWithServiceReportDTO>();

  const { data: otherServices } = useQuery({
    queryKey: ["otherServices"],
    queryFn: async () => await otherServiceService.GetAll(),
    initialData: [],
  });

  return (
    <FieldArray name={otherServiceReportsKey}>
      {({ push, remove }) => (
        <>
          {values.otherServiceReports?.map(
            (record: OtherServiceReports, index) => (
              <OtherServiceReportRow
                key={index}
                record={record}
                index={index}
                remove={remove}
                otherServices={otherServices}
                setFieldValue={setFieldValue}
              />
            )
          )}

          <Button
            type="primary"
            style={{ marginTop: 12 }}
            onClick={() => push(EMPTY_FORM)}
          >
            Add Report
          </Button>
        </>
      )}
    </FieldArray>
  );
}

type RowProps = {
  record: OtherServiceReports;
  remove: <X = any>(index: number) => X | undefined;
  index: number;
  otherServices: RefOtherService[];
  setFieldValue: (field: string, value: any) => void;
};

function OtherServiceReportRow({
  record,
  remove,
  index,
  otherServices,
  setFieldValue,
}: RowProps) {
  const otherServiceReportsKey: keyof BillingStatementWithServiceReportDTO =
    "otherServiceReports";
  const jsonDataKey: keyof OtherServiceReports = "jsonData";
  const totalAmount: keyof OtherServiceReports = "totalAmount";
  const otherServiceId: keyof OtherServiceReports = "otherServiceId";
  const { values } = useFormikContext<BillingStatementWithServiceReportDTO>();

  const [fields, setFields] = useState<RefOtherServiceField[]>([]);

  useEffect(() => {
    let service: any | undefined = undefined;
    service = values?.otherServiceReports?.find(
      (o) => o.otherServiceId == record.otherServiceId
    );
    if (!service) {
      service = otherServices.find((o) => o.id === record.otherServiceId);
    }
    service = { ...service, jsonInitialData: service?.jsonData };
    console.log(service);
    if (service?.jsonInitialData) {
      const parsed = JSON.parse(
        service.jsonInitialData
      ) as RefOtherServiceField[];
      setFields(parsed.sort((a, b) => (a.id ?? 0) - (b.id ?? 0)));

      setFieldValue(
        `${otherServiceReportsKey}[${index}].${jsonDataKey}`,
        service.jsonInitialData
      );
    }
  }, [record.otherServiceId, otherServices]);

  const handleFieldInput = (val: number, field: RefOtherServiceField) => {
    const updated = fields.map((f) =>
      f.id === field.id ? { ...f, value: val } : f
    );
    setFields(updated);

    setFieldValue(
      `${otherServiceReportsKey}[${index}].${jsonDataKey}`,
      JSON.stringify(updated)
    );

    handleTotalAmount(record.otherServiceId, updated);
  };

  const handleTotalAmount = (
    serviceId?: number | null,
    updatedFields?: RefOtherServiceField[]
  ) => {
    const data = otherServices.find((o) => o.id === serviceId);
    if (!data?.formula) return;

    const context: Record<string, number> = {};
    (updatedFields ?? fields).forEach((f) => {
      if (f.jsonKey) context[f.jsonKey] = f.value ?? 0;
    });

    const result = handleEvaluate(data.formula, context);
    setFieldValue(`${otherServiceReportsKey}[${index}].${totalAmount}`,  result.toFixed(2));
  };

  return (
    <Card className="card mb-2">
      <div className="d-flex justify-content-between">
        <strong>Service {index + 1}</strong>
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => remove(index)}
        />
      </div>

      <SelectFormik<any, RefOtherService>
        name={`${otherServiceReportsKey}[${index}].${otherServiceId}`}
        keyValue="id"
        keyLabel="name"
        option={otherServices}
      />

      <div className="row row-cols-lg-3">
        {fields.map((field) => (
          <div key={field.id}>
            <label>{field.name}</label>
            <InputNumber
              style={{ width: "100%" }}
              value={field.value ?? 0}
              onChange={(val) => handleFieldInput(val as number, field)}
            />
          </div>
        ))}
      </div>
      <InputFormik<any>
        prefix={<span>₱</span>}
        label="Amount"
        readOnly
        name={`${otherServiceReportsKey}[${index}].${totalAmount}`}
      />
    </Card>
  );
}
