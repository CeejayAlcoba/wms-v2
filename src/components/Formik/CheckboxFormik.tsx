import { Field, type FieldProps } from "formik";
import { Form, Checkbox } from "antd";
import type { CheckboxProps } from "antd";

type CheckboxFormikProps<T = unknown> = {
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
}: CheckboxFormikProps<T>) {
  return (
    <Field name={name}>
      {({ field, meta, form }: FieldProps) => (
        <Form.Item
          validateStatus={meta.touched && meta.error ? "error" : ""}
          help={meta.touched && meta.error ? meta.error : ""}
        >
          <Checkbox
            checked={field.value}
            {...field}
            {...rest}
            onBlur={() => form.setFieldTouched(name, true)}
          >
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
