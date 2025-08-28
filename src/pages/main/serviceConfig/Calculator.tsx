import { useEffect, useState } from "react";
import { Button, Input, Card } from "antd";
import type { Property } from "csstype";
import { useFormikContext } from "formik";
import type { ServiceConfigDTO } from "../../../@types/DTOs/ServiceConfigDTO";

type ButtonType = {
  name: string;
  value: string;
  color?: Property.Color | undefined;
};

const defaultColor: Property.Color = "#1890ff";

const Calculator = () => {
  const [formula, setFormula] = useState({
    formula: "",
    display: "",
  });
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
    useFormikContext<ServiceConfigDTO>();

  const handleClick = (btn: ButtonType) => {
    if (btn.value === "C") {
      setFormula({
        formula: "",
        display: "",
      });
    } else {
      setFormula({
        formula: formula.formula + btn.value,
        display: formula.display + " " + btn.name,
      });
    }
  };

  useEffect(() => {
    const getFields = values.serviceFields ?? [];
    const buttonFields: ButtonType[] = getFields?.map((f) => ({
      name: f.name ?? "",
      value: f.jsonKey ?? "",
    }));
    setButtons([...initialButtons, ...buttonFields]);
    setFormula({
      formula: values.formula ?? "",
      display: values.displayFormula ?? "",
    });
  }, [values.serviceFields]);

  useEffect(() => {
    const formulaKey: keyof ServiceConfigDTO = "formula";
    const displayFormulaKey: keyof ServiceConfigDTO = "displayFormula";
    setFieldValue(formulaKey, formula.formula);
    setFieldValue(displayFormulaKey, formula.display);
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
        value={formula.display}
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
