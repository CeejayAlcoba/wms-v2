import { Field, type FieldProps } from "formik";
import { Form, Checkbox, Typography } from "antd";
import type { CheckboxProps } from "antd";
import type { ReactNode } from "react";

const { Text } = Typography;

type CheckboxFormikProps<T = unknown> = {
  name: keyof T & string;
  label?: string;
  description?: string | ReactNode;
  askterisk?: boolean;
} & CheckboxProps;

export default function CheckboxFormik<T = unknown>({
  name,
  label,
  description,
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
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>
                {label}
                {askterisk && <span style={{ color: "red" }}>{" *"}</span>}
              </span>
              {description && (
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  {description}
                </Text>
              )}
            </div>
          </Checkbox>
        </Form.Item>
      )}
    </Field>
  );
}
