import { useFormikContext } from "formik";
import dayjs from "dayjs";
import type { DatePickerFormikProps } from "./DatePicker";
import DatePickerFormik from "./DatePicker";

type DateRangePickerFormikProps<T = unknown> = {
  dateFromProps: DatePickerFormikProps<T>;
  dateToProps: DatePickerFormikProps<T>;
};

export default function DateRangePickerFormik<T = unknown>({
  dateFromProps,
  dateToProps,
}: DateRangePickerFormikProps<T>) {
  const { getFieldProps } = useFormikContext<T>();
  return (
    <div className="row row-cols-lg-2">
      <DatePickerFormik
        placeholder="Select date from"
        maxDate={dayjs(getFieldProps(dateToProps.name).value)}
        {...dateFromProps}
      />
      <DatePickerFormik
        placeholder="Select date to"
        minDate={dayjs(getFieldProps(dateFromProps.name).value)}
        {...dateToProps}
      />
    </div>
  );
}
