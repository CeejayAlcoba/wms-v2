import { Button, Space } from "antd";
import { FieldArray, useFormikContext } from "formik";
import type { OtherServiceDTO } from "../../../@types/DTOs/OtherServiceDTO";
import SelectFormik from "../../../components/Formik/SelectFormik";
import type { RefOtherServiceField } from "../../../@types/tables/RefOtherServiceField";
import { useQuery } from "@tanstack/react-query";
import { otherServiceFieldService } from "../../../services/otherServiceFieldService";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { EMPTY_FIELD } from "./__constants__/EMPTY_FIELD";

export default function OtherServiceFields() {
  const { values, setFieldValue, errors } = useFormikContext<OtherServiceDTO>();

  const otherServiceFieldsKey: keyof OtherServiceDTO = "otherServiceFields";

  const { data: otherServiceFields } = useQuery({
    queryKey: ["otherServiceFields"],
    queryFn: async () => await otherServiceFieldService.GetAll(),
    initialData: [],
  });

  const handleSelectChange = (value: number, index: number) => {
    const selectedOption = otherServiceFields.find((o) => o.id == value);
    setFieldValue(`${otherServiceFieldsKey}[${index}]`, selectedOption);
  };
  return (
    <>
      {values.otherServiceFields?.length == 0 && (
        <div className="text-danger">{errors.otherServiceFields}</div>
      )}
      <FieldArray name={otherServiceFieldsKey}>
        {({ push, remove }) => (
          <>
            <div className="row row-cols-lg-4">
              {values.otherServiceFields?.map((_, index) => (
                <Space key={index} style={{ display: "flex", marginBottom: 8 }}>
                  <SelectFormik<any, RefOtherServiceField>
                    allowClear={false}
                    label={`Field ${index + 1}`}
                    name={`${otherServiceFieldsKey}[${index}].id`}
                    option={otherServiceFields}
                    keyLabel="name"
                    keyValue="id"
                    style={{ width: 200 }}
                    onChange={(value) => handleSelectChange(value, index)}
                  />
                  {(values.otherServiceFields||[]).length > 1 && (
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => remove(index)}
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
