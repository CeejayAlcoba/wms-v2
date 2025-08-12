import { Field, type FieldProps } from "formik";
import { Form, DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";

export type DatePickerFormikProps<T = unknown> = {
  name: keyof T & string;
  label?: string;
  askterisk?: boolean;
} & DatePickerProps;

export default function DatePickerFormik<T = unknown>({
  name,
  label,
  askterisk = false,
  ...rest
}: DatePickerFormikProps<T>) {
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
          <div>
            <DatePicker
              style={{ width: "100%" }}
              {...rest}
              value={field.value ? dayjs(field.value) : null}
              onBlur={() => form.setFieldTouched(name, true)}
              onChange={(date) => {
                form.setFieldTouched(name, true);
                form.setFieldValue(
                  name,
                  date ? dayjs(date).format("YYYY-MM-DD") : null
                );
              }}
            />
          </div>
        </Form.Item>
      )}
    </Field>
  );
}
