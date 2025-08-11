import {  Tabs } from "antd";
import {  useState } from "react";
import PendingTable from "./pending/PendingTable";
import CompleteTable from "./complete/CompleteTable";
import { TAB_ITEMS } from "./__constants__/TAB_ITEMS";

export type TabKey = "Pending" | "Completed";

export default function IndexPage() {
  const [activeKey, setActiveKey] = useState<TabKey>("Pending");

  const handleTab = (key: string) => {
    setActiveKey(key as TabKey);
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
        {activeKey == "Pending" ? <PendingTable /> : <CompleteTable />}
      </div>
    </>
  );
}
