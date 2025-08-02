import { ErrorMessage, Field } from "formik";
import React from "react";

type FormiksControlProps<T = unknown> = {
  name: keyof T & string;
  label?: string;
  askterisk?: boolean;
  component: React.ReactElement<any>;
};

export function FormiksControl<T = unknown>(props: FormiksControlProps<T>) {
  const { label, name, component, askterisk = false } = props;

  return (
    <div className="mt-3 mb-3">
      {label && (
        <label>
          {label}
          {askterisk && <span style={{ color: "red" }}>*</span>}
        </label>
      )}
      <div className="w-100">
        <Field autoComplete="off" name={name}>
          {({ field, meta }: any) => {
            const hasError = meta.touched && meta.error;
            return React.cloneElement(component, {
              onChange: (e: any) => {
                field.onChange(e);
                component.props.onChange?.(e);
              },
              size: "large",
              className: `w-100 ${component.props.className ?? ""} ${
                hasError ? "border-danger" : ""
              }`,
            });
          }}
        </Field>
      </div>

      <ErrorMessage name={name}>
        {(msg) => <div className="text-danger">{msg}</div>}
      </ErrorMessage>
    </div>
  );
}
