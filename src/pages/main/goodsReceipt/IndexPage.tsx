import { Tabs } from "antd";
import { useState } from "react";
import { bookingDetailsService } from "../../../services/bookingDetailsService";
import type { BookingDetails } from "../../../@types/tables/BookingDetails";
import { EMPTY_BOOKING_DETAILS } from "./__constants__/EMPTY_BOOKING_DETAILS";
import { useQuery } from "@tanstack/react-query";
import FilterCard from "./FilterCard";
import type { FormikHelpers } from "formik";
import { TAB_ITEMS } from "./__constants__/TAB_ITEMS";
import PendingCompleteTable from "./PendingCompleteTable";

export type TabKey = "Pending" | "Completed";

export default function IndexPage() {
  const [search, setSearch] = useState<BookingDetails>(EMPTY_BOOKING_DETAILS);
  const [activeKey, setActiveKey] = useState<TabKey>("Pending");
  const {
    data: bookingDetails,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["products", search, activeKey],
    queryFn: async ({ queryKey }) => {
      const [, searchParam, activeKey] = queryKey;
      if (activeKey == "Pending") {
        return await bookingDetailsService.GetAllGoodsReceiptPending(
          searchParam as BookingDetails
        );
      } else {
        return await bookingDetailsService.GetAllGoodsReceipCompleted(
          searchParam as BookingDetails
        );
      }
    },
    initialData: [],
  });

  const handleTab = (key: string) => {
    setActiveKey(key as TabKey);
  };

  const handleSearch = async (
    values: BookingDetails,
    formikHelpers: FormikHelpers<BookingDetails>
  ) => {
    formikHelpers.setSubmitting(true);
    await setSearch(values);
    await refetch();
    formikHelpers.setSubmitting(false);
  };
  return (
    <>
      <Tabs defaultActiveKey="1" items={TAB_ITEMS} onChange={handleTab} />
      <FilterCard onSearch={handleSearch} activeKey={activeKey} />
      <PendingCompleteTable
        bookingDetails={bookingDetails}
        refetch={refetch}
        isFetching={isFetching}
        activeKey={activeKey}
      />
    </>
  );
}
