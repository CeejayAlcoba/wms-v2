import { Field, type FieldProps } from "formik";
import { Input, Form } from "antd";
import type { InputProps } from "antd";

type InputFormikProps<T = unknown> = {
  name: keyof T & string;
  label?: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  askterisk?: boolean;
} & InputProps;

export default function InputFormik<T = unknown>({
  name,
  label,
  type = "text",
  placeholder,
  askterisk = false,
  ...rest
}: InputFormikProps<T>) {
  const AntInputComponent = type === "password" ? Input.Password : Input;

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
          <AntInputComponent
            {...field}
            {...rest}
            onBlur={() => form.setFieldTouched(name, true)}
            type={type}
            placeholder={placeholder}
          />
        </Form.Item>
      )}
    </Field>
  );
}
