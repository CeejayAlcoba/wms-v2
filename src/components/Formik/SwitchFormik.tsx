import { Field, type FieldProps } from "formik";
import { Form, Switch } from "antd";
import type { SwitchProps } from "antd";

type SwitchFormikProps<T = unknown> = {
  name: keyof T & string;
  label?: string;
  askterisk?: boolean;
} & SwitchProps;

export default function SwitchFormik<T = unknown>({
  name,
  label,
  askterisk = false,
  ...rest
}: SwitchFormikProps<T>) {
  return (
    <Field name={name}>
      {({ field, meta, form }: FieldProps) => (
        <Form.Item
          validateStatus={meta.touched && meta.error ? "error" : ""}
          help={meta.touched && meta.error ? meta.error : ""}
          className="align-items-center"
        >
          <Switch
            {...field}
            {...rest}
            checked={field.value}
            onChange={(value) => {
              form.setFieldValue(name, value);
            }}
          />{" "}
          <label>
            {label}
            {askterisk && <span style={{ color: "red" }}>{" *"}</span>}
          </label>
        </Form.Item>
      )}
    </Field>
  );
}
