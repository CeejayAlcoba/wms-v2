import { Field, type FieldProps } from "formik";
import { Input, Form, Select } from "antd";
import type { InputProps, SelectProps } from "antd";
import { useEffect, useState } from "react";

type SelectFormikProps<T = unknown, T2 = any> = {
  name: keyof T & string;
  label?: string;
  placeholder?: string;
  askterisk?: boolean;
  keyValue: keyof T2;
  keyLabel: keyof T2;
  option: T2[];
} & SelectProps;

export default function SelectFormik<T = unknown, T2 = any>({
  name,
  label,
  placeholder,
  keyValue,
  keyLabel,
  option,
  askterisk = false,
  ...rest
}: SelectFormikProps<T, T2>) {
  const [newOptions, setNewOptions] = useState<any[]>([]);

  const initialProps: SelectProps = {
    allowClear: true,
    ...rest,
  };
  useEffect(() => {
    if (option.length == 0) return;
    setNewOptions(
      option?.map((o) => ({
        value: o[keyValue],
        label: o[keyLabel],
      }))
    );
  }, [option]);

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
          <Select
            {...field}
            showSearch
            placeholder={placeholder}
            value={field.value}
            onChange={(value) => {
              form.setFieldValue(name, value || null);
            }}
            optionFilterProp={keyLabel as string}
            filterOption={(input, option) =>
              (option?.label ?? "")
                .toString()
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            options={newOptions}
            {...initialProps}
          />
        </Form.Item>
      )}
    </Field>
  );
}
