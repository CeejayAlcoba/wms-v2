import { Field, type FieldProps } from "formik";
import { Form, Select } from "antd";
import type { SelectProps } from "antd";
import { useEffect, useState, useMemo } from "react";

export type SelectFormikProps<T = unknown, T2 = any> = {
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
  onChange,
  mode,
  ...rest
}: SelectFormikProps<T, T2>) {
  const [newOptions, setNewOptions] = useState<any[]>([]);

  const initialProps: SelectProps = {
    allowClear: true,
    mode,
    ...rest,
  };

  const isMultiple = mode === "multiple" || mode === "tags";

  // Memoize options to prevent unnecessary re-renders
  const mappedOptions = useMemo(() => {
    if (!option || option.length === 0) return [];
    
    return option.map((o) => ({
      value: o[keyValue],
      label: o[keyLabel],
    }));
  }, [option, keyValue, keyLabel]);

  useEffect(() => {
    setNewOptions(mappedOptions);
  }, [mappedOptions]);

  // Helper function to get the display value for Select component
  const getDisplayValue = (fieldValue: any) => {
    if (fieldValue === null || fieldValue === undefined) {
      return isMultiple ? [] : undefined;
    }

    if (isMultiple) {
      // For multiple mode, fieldValue should be an array
      if (!Array.isArray(fieldValue)) {
        return [];
      }
      
      return fieldValue.map((item: any) => {
        // If item is an object, extract the key value
        if (typeof item === 'object' && item !== null && keyValue in item) {
          return item[keyValue];
        }
        // If item is already a primitive value
        return item;
      });
    } else {
      // For single mode
      if (typeof fieldValue === 'object' && fieldValue !== null && keyValue in fieldValue) {
        return fieldValue[keyValue];
      }
      return fieldValue;
    }
  };

  // Helper function to get the form value from display value
  const getFormValue = (displayValue: any) => {
    if (displayValue === null || displayValue === undefined) {
      return null;
    }

    if (isMultiple) {
      // Multiple mode: return array of full objects
      if (!Array.isArray(displayValue)) {
        return [];
      }
      
      return displayValue.map((val: any) => {
        const foundOption = option.find((opt) => opt[keyValue] === val);
        return foundOption || val; // Return the full object if found, otherwise the primitive value
      });
    } else {
      // Single mode (default): return just the primitive value (ID)
      return displayValue;
    }
  };

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
            mode={mode}
            showSearch={!isMultiple} // Disable showSearch for multiple mode as it can cause issues
            placeholder={placeholder}
            value={getDisplayValue(field.value)}
            onBlur={() => form.setFieldTouched(name, true)}
            onChange={(value) => {
              const formValue = getFormValue(value);
              form.setFieldValue(name, formValue);
              onChange && onChange(value, mappedOptions);
            }}
            onSelect={(value, option) => {
              // Optional: handle individual selections in multiple mode
              rest.onSelect && rest.onSelect(value, option);
            }}
            onDeselect={(value, option) => {
              // Optional: handle individual deselections in multiple mode
              rest.onDeselect && rest.onDeselect(value, option);
            }}
            optionFilterProp="label"
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