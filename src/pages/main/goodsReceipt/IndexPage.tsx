import { Tabs } from "antd";
import { useState } from "react";
import { bookingDetailsService } from "../../../services/bookingDetailsService";
import { EMPTY_BOOKING_DETAILS } from "./__constants__/EMPTY_BOOKING_DETAILS";
import { useQuery } from "@tanstack/react-query";
import FilterCard from "./FilterCard";
import type { FormikHelpers } from "formik";
import { TAB_ITEMS } from "./__constants__/TAB_ITEMS";
import PendingCompleteTable from "./PendingCompleteTable";
import type { BookingDetailsFilterDTO } from "../../../@types/DTOs/BookingDetailsFilterDTO";

export type TabKey = "Pending" | "Completed";

export default function IndexPage() {
  const [search, setSearch] = useState<Partial<BookingDetailsFilterDTO>>(
    EMPTY_BOOKING_DETAILS
  );
  const [activeKey, setActiveKey] = useState<TabKey>("Pending");

  const handleTab = (key: string) => {
    setActiveKey(key as TabKey);
  };

  const handleSearch = async (
    values: BookingDetailsFilterDTO,
    formikHelpers: FormikHelpers<BookingDetailsFilterDTO>
  ) => {
    formikHelpers.setSubmitting(true);
    await setSearch(values);
    formikHelpers.setSubmitting(false);
  };
  return (
    <>
      <Tabs defaultActiveKey="1" items={TAB_ITEMS} onChange={handleTab} />
      <FilterCard onSearch={handleSearch} activeKey={activeKey} />
      <PendingCompleteTable
        search={search}
        setSearch={setSearch}
        activeKey={activeKey}
      />
    </>
  );
}
