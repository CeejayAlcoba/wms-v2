import { Field, type FieldProps } from "formik";
import { Form, Checkbox } from "antd";
import type { CheckboxProps } from "antd";

type InputFormikProps<T = unknown> = {
  name: keyof T & string;
  label?: string;
  askterisk?: boolean;
} & CheckboxProps;

export default function CheckboxFormik<T = unknown>({
  name,
  label,
  type = "text",
  askterisk = false,
  ...rest
}: InputFormikProps<T>) {
  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <Form.Item
          validateStatus={meta.touched && meta.error ? "error" : ""}
          help={meta.touched && meta.error ? meta.error : ""}
        >
          <Checkbox checked={field.value} {...field} {...rest}>
            <label>
              {label}
              {askterisk && <span style={{ color: "red" }}>{" *"}</span>}
            </label>
          </Checkbox>
        </Form.Item>
      )}
    </Field>
  );
}
