import { Field, type FieldProps } from "formik";
import { Form, InputNumber } from "antd";
import type { InputNumberProps } from "antd";

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
  onChange,
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
            onChange={(value) => {
              form.setFieldValue(name, value || null);
              onChange && onChange(value);
            }}
            onBlur={() => form.setFieldTouched(name, true)}
            placeholder={placeholder}
          />
        </Form.Item>
      )}
    </Field>
  );
}
