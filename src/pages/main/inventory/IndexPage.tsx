import { Button, Popconfirm, Tooltip, type TableProps } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useState, type SetStateAction } from "react";

import FilterCard from "./FilterCard";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import type { ReportInventoryFilterDTO } from "../../../@types/DTOs/ReportInventoryFilterDTO";

import InventoryTable from "./InventoryTable";

export default function IndexPage() {
  const [search, setSearch] = useState<ReportInventoryFilterDTO>(EMPTY_FORM);

  const handleSearch = async (value: ReportInventoryFilterDTO) => {
    await setSearch(value);
  };

  return (
    <>
      {/* <SaveModal
        open={saveModalOpen}
        onAfterSave={handleAfterSave}
        onCancel={handleClickCancel}
        selectedData={selectedData}
      /> */}
      <FilterCard onSearch={handleSearch} />
      <InventoryTable search={search} setSearch={setSearch} />
      {/* <TableComponent<ReportInventoryDTO>
        rowKey="id"
        headerTitle={pageTitle}
        columns={columns}
        dataSource={inventories}
        loading={isFetching}
        print={{ onBeforePrint: async () => await handleUnpaginate() }}
        pdf={{ onChange: async () => await handleUnpaginate() }}
        pagination={{
          total: inventories?.[0]?.totalItems,
          onChange: handlePaginate,
        }}
        expandable={{
          expandedRowRender: (record) => (
            <CargoHistoryTable
              cargoHistories={cargoHistories}
              record={record}
            />
          ),
          onExpand: handleExpand,
        }}
        footer={() => (
          <TableTotalFooter<ReportInventoryDTO>
            data={inventories}
            values={TABLE_TOTAL_FOOTER}
          />
        )}
      /> */}
    </>
  );
}
