import { Field, type FieldProps } from "formik";
import { Input, Form, InputNumber } from "antd";
import type { InputNumberProps, InputProps } from "antd";

type InputNumberFormikProps<T = unknown> = {
  name: keyof T & string;
  label?: string;
  placeholder?: string;
  askterisk?: boolean;
} & InputNumberProps;

export default function InputNumberFormik<T = unknown>({
  name,
  label,
  placeholder,
  askterisk = false,
  ...rest
}: InputNumberFormikProps<T>) {
  return (
    <Field name={name}>
      {({ field, form, meta }: FieldProps) => (
        <Form.Item
          validateStatus={meta.touched && meta.error ? "error" : ""}
          help={meta.touched && meta.error ? meta.error : ""}
        >
          <label>
            {label}
            {askterisk && <span style={{ color: "red" }}>{" *"}</span>}
          </label>
          <InputNumber
            style={{ width: "100%" }}
            {...rest}
            value={field.value}
            onChange={(value) => form.setFieldValue(name, value || null)}
            placeholder={placeholder}
          />
        </Form.Item>
      )}
    </Field>
  );
}
