import type { TableProps } from "antd";
import type { BookingDetailsDTO } from "../../../../@types/DTOs/BookingDetailsDTO";

import dayjs from "dayjs";

export const INITIAL_COLUMNS: TableProps<BookingDetailsDTO>["columns"] = [
  {
    title: "Actual Check In Date",
    dataIndex: "actualCheckInDate",
    key: "actualCheckInDate",
    render: (data) => dayjs(data).format("YYYY-MM-DD"),
  },
  {
    title: "ICR",
    dataIndex: "icrReferenceNumber",
    key: "icrReferenceNumber",
  },
  {
    title: "DR No",
    dataIndex: "drNumber",
    key: "drNumber",
  },

  {
    title: "Principal",
    dataIndex: "principal",
    key: "principal",
  },
  {
    title: "Product",
    dataIndex: "productCategory",
    key: "productCategory",
  },
  {
    title: "Truck Plate No",
    dataIndex: "truckPlateNumber",
    key: "truckPlateNumber",
  },
  {
    title: "Pallete Group",
    dataIndex: "palleteGroup",
    key: "palleteGroup",
  },
];
