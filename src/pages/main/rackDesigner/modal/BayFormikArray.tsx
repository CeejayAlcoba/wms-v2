import { FieldArray, useFormikContext } from "formik";
import type { RackDetailsDTO } from "../../../../@types/DTOs/RackDetailsDTO";
import InputFormik from "../../../../components/Formik/InputFormik";
import InputNumberFormik from "../../../../components/Formik/InputNumberFormik";
import { Button, Collapse, Popconfirm, Space } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import type { ShelfDetails } from "../../../../@types/tables/ShelfDetails";
import type { BayDetailsGetDTO } from "../../../../@types/DTOs/BayDetailsGetDTO";

const { Panel } = Collapse;

export default function BayFormikArray() {
  const { values, setFieldValue } = useFormikContext<RackDetailsDTO>();
  const bayDetails: keyof RackDetailsDTO = "bayDetails";

  const handleSetEmptyShelves = (
    value: any,
    bay: BayDetailsGetDTO,
    index: number
  ) => {
    console.log(bay, value);
    const currentLength = bay.shelfDetails.length;
    if (bay.id && currentLength > value) {
      const slicedShelfDetails = bay.shelfDetails.slice(0, value);
      setFieldValue(`${bayDetails}[${index}].shelfDetails`, slicedShelfDetails);
    } else if (bay.id) {
      const diff = value - currentLength;
      const newShelves = Array.from({ length: diff }, () => ({
        id: null,
        name: null,
        shelfDetailsStatusId: null,
        isOccupied: null,
        bayDetailsId: null,
        contentTypeId: null,
        shelfDetailsTagId: null,
        contentValue: null,
      }));
      const updatedShelfDetails = [...bay.shelfDetails, ...newShelves];
      setFieldValue(
        `${bayDetails}[${index}].shelfDetails`,
        updatedShelfDetails
      );
    } else {
      const emptyShelves = Array<ShelfDetails>(value).fill({
        id: null,
        name: null,
        shelfDetailsStatusId: null,
        isOccupied: null,
        bayDetailsId: null,
        contentTypeId: null,
        shelfDetailsTagId: null,
        contentValue: null,
      });
      setFieldValue(`${bayDetails}[${index}].shelfDetails`, emptyShelves);
    }
  };

  return (
    <FieldArray name={bayDetails}>
      {({ push, remove }) => (
        <div>
          <Collapse accordion>
            {values.bayDetails?.map((bay, index) => (
              <Panel
                header={`Bay ${index + 1} : ${bay.name ?? ""}`}
                key={index}
                extra={
                  <Popconfirm
                    title="Delete Confirmation"
                    description="Are you sure you want to delete this item?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => remove(index)}
                  >
                    <DeleteOutlined
                      style={{ color: "red" }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </Popconfirm>
                }
              >
                <Space direction="vertical" style={{ width: "100%" }}>
                  <InputFormik<any>
                    name={`${bayDetails}[${index}].name`}
                    label="Name"
                  />
                  <InputNumberFormik<any>
                    name={`${bayDetails}[${index}].numberOfShelves`}
                    label="Number of Shelves"
                    onChange={(value) =>
                      handleSetEmptyShelves(value, bay, index)
                    }
                  />
                </Space>
              </Panel>
            ))}
          </Collapse>

          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={() => push({ name: "", numberOfShelves: 0 })}
            style={{ marginTop: 10 }}
          >
            Add Bay
          </Button>
        </div>
      )}
    </FieldArray>
  );
}
