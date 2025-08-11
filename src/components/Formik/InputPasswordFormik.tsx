import { FastField, type FieldProps } from "formik";
import { Input, Form } from "antd";
import type { InputProps } from "antd";

type InputFormikProps<T = unknown> = {
  name: keyof T & string;
  label?: string;
  placeholder?: string;
  askterisk?: boolean;
  onChange?: (value: any) => void;
} & InputProps;

export default function InputPasswordFormik<T = unknown>({
  name,
  label,
  type = "text",
  placeholder,
  askterisk = false,
  onChange,
  ...rest
}: InputFormikProps<T>) {

  return (
    <FastField name={name}>
      {({ field, form, meta }: FieldProps) => (
        <Form.Item
          validateStatus={meta.touched && meta.error ? "error" : ""}
          help={meta.touched && meta.error ? meta.error : ""}
        >
          <label>
            {label}
            {askterisk && <span style={{ color: "red" }}>{" *"}</span>}
          </label>
          <Input.Password
            {...field}
            {...rest}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              form.setFieldValue(name, e.target.value || null);
              onChange && onChange(e.target.value);
            }}
            onBlur={() => form.setFieldTouched(name, true)}
            type={type}
            placeholder={placeholder}
          />
        </Form.Item>
      )}
    </FastField>
  );
}
