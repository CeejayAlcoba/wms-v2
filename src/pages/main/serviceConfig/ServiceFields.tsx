import { Button, Space } from "antd";
import { FieldArray, useFormikContext } from "formik";
import SelectFormik from "../../../components/Formik/SelectFormik";
import { useQuery } from "@tanstack/react-query";
import { serviceFieldService } from "../../../services/serviceFieldService";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { EMPTY_FIELD } from "./__constants__/EMPTY_FIELD";
import type { RefServiceField } from "../../../@types/tables/RefServiceField";
import type { ServiceConfigDTO } from "../../../@types/DTOs/ServiceConfigDTO";

const serviceFieldsKey: keyof ServiceConfigDTO = "serviceFields";
const formulaKey: keyof ServiceConfigDTO = "formula";
const displayFormulaKey: keyof ServiceConfigDTO = "displayFormula";

export default function ServiceFields() {
  const { values, setFieldValue, errors } =
    useFormikContext<ServiceConfigDTO>();

  const { data: serviceFields } = useQuery({
    queryKey: ["serviceFields"],
    queryFn: async () => await serviceFieldService.GetAll(),
    initialData: [],
  });
  const handleResetFormula = () => {
    setFieldValue(`${formulaKey}`, "");
    setFieldValue(`${displayFormulaKey}`, "");
  };
  const handleSelectChange = (value: number, index: number) => {
    handleResetFormula();
    const selectedOption = serviceFields.find((o) => o.id == value);
    setFieldValue(`${serviceFieldsKey}[${index}]`, selectedOption);
  };
  return (
    <>
      {values.serviceFields?.length == 0 && (
        <div className="text-danger">{errors.serviceFields}</div>
      )}
      <FieldArray name={serviceFieldsKey}>
        {({ push, remove }) => (
          <>
            <div className="row row-cols-lg-4">
              {values.serviceFields?.map((_, index) => (
                <Space key={index} style={{ display: "flex", marginBottom: 8 }}>
                  <SelectFormik<any, RefServiceField>
                    allowClear={false}
                    label={`Field ${index + 1}`}
                    name={`${serviceFieldsKey}[${index}].id`}
                    option={serviceFields}
                    keyLabel="name"
                    keyValue="id"
                    style={{ width: 200 }}
                    onChange={(value) => handleSelectChange(value, index)}
                  />
                  {(values.serviceFields || []).length > 1 && (
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        handleResetFormula();
                        remove(index);
                      }}
                    />
                  )}
                </Space>
              ))}
            </div>

            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ marginTop: 12 }}
              onClick={() => push(EMPTY_FIELD)}
            >
              Add Field
            </Button>
          </>
        )}
      </FieldArray>
    </>
  );
}
