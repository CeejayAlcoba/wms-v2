import { useEffect, useState } from "react";
import { Button, Input, Card } from "antd";
import type { RefOtherServiceField } from "../../../@types/tables/RefOtherServiceField";
import type { Property } from "csstype";
import { useFormikContext } from "formik";
import type { OtherServiceDTO } from "../../../@types/DTOs/OtherServiceDTO";
import { otherServiceFieldService } from "../../../services/otherServiceFieldService";
import { useQuery } from "@tanstack/react-query";

type ButtonType = {
  name: string;
  value: string;
  color?: Property.Color | undefined;
};

const defaultColor: Property.Color = "#1890ff";

const Calculator = () => {
  const { data: otherServiceFields } = useQuery({
    queryKey: ["otherServiceFields"],
    queryFn: async () => await otherServiceFieldService.GetAll(),
    initialData: [],
  });
  const [fields, setFields] = useState<RefOtherServiceField[]>([]);
  const [formula, setFormula] = useState("");
  const [visualValue, setVisualValue] = useState("");
  const [initialButtons] = useState<ButtonType[]>([
    { name: "Clear", value: "C", color: "white" },
    { name: "(", value: "(", color: defaultColor },
    { name: ")", value: ")", color: defaultColor },
    { name: "+", value: "+", color: defaultColor },
    { name: "-", value: "-", color: defaultColor },
    { name: "×", value: "*", color: defaultColor },
    { name: "÷", value: "/", color: defaultColor },
  ]);
  const [buttons, setButtons] = useState<ButtonType[]>([]);

  const { setFieldValue, errors, touched, values } =
    useFormikContext<OtherServiceDTO>();

  const handleClick = (btn: ButtonType) => {
    if (btn.value === "C") {
      setFormula("");
      setVisualValue("");
    } else {
      setFormula((prev) => prev + btn.value);
      setVisualValue((prev) => (prev ? prev + " " + btn.name : btn.name));
    }
  };

  const handleJsonInitial = () => {
    return JSON.stringify(fields);
  };

  useEffect(() => {
    const getFields =values.otherServiceFields??[]
    const buttonFields: ButtonType[] = getFields?.map((f) => ({
      name: f.name ?? "",
      value: f.jsonKey ?? "",
    }));
    setButtons([...initialButtons, ...buttonFields]);
    setVisualValue("");
    setFormula("");
    setFields(getFields);
  }, [values.otherServiceFields]);

  useEffect(() => {
    const formulaKey: keyof OtherServiceDTO = "formula";
    const jsonInitialDataKey: keyof OtherServiceDTO = "jsonInitialData";
    const initialValues = handleJsonInitial();
    setFieldValue(formulaKey, formula);
    setFieldValue(jsonInitialDataKey, initialValues);
  }, [formula]);

  return (
    <Card style={{ margin: "20px auto" }} className="card">
      <div className="row row-cols-md-1">
         <div>
          <strong>Previous: </strong> {values.previousFormula || "N/A"}
        </div>
        <strong>Formula</strong>
       
      </div>

      <Input
        size="large"
        value={visualValue}
        className={
          touched.formula && errors.formula ? "border border-danger" : ""
        }
        readOnly
        style={{ marginBottom: 10, textAlign: "right" }}
      />
      <div className="text-danger">
        {touched.formula && errors.formula && errors.formula}
      </div>
      <div className="row row-cols-md-4 gap-1">
        {buttons.map((btn, index) => (
          <>
            <Button
              block
              key={index}
              type={btn.value === "C" ? "primary" : "default"}
              danger={btn.value === "C"}
              onClick={() => handleClick(btn)}
              style={{ width: 200 }}
            >
              <strong style={{ color: btn.color }}>{btn.name}</strong>
            </Button>
          </>
        ))}
      </div>
    </Card>
  );
};

export default Calculator;
