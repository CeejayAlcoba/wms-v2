import { Tabs } from "antd";
import { useState } from "react";
// import PendingTable from "./pending/PendingTable";
// import CompleteTable from "./complete/CompleteTable";
import { TAB_ITEMS } from "./__constants__/TAB_ITEMS";
import PendingPage from "./pending/PendingPage";
import ApprovedPage from "./approved/ApprovedPage";
import FilterCard from "./FilterCard";
import type { UserDTO } from "../../../@types/DTOs/UserDTO";
import type { FormikHelpers } from "formik";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";

export type TabKey = "Pending" | "Completed";

export default function IndexPage() {
  const [activeKey, setActiveKey] = useState<TabKey>("Pending");
  const [search, setSearch] = useState<UserDTO>(EMPTY_FORM);

  const handleTab = (key: string) => {
    setActiveKey(key as TabKey);
  };
  const handleSearch = (
    values: UserDTO
  ) => {
    setSearch(values);
    console.log(values)
  };

  return (
    <>
      <Tabs
        defaultActiveKey="1"
        items={TAB_ITEMS}
        onChange={handleTab}
        activeKey={activeKey}
        className="position-sticky"
      />
      <div
        style={{
          height: "70vh",
          overflow: "auto",
        }}
      >
        <FilterCard onSearch={handleSearch} />
        {activeKey == "Pending" ? <PendingPage search={search}/> : <ApprovedPage search={search}/>}
      </div>
    </>
  );
}
