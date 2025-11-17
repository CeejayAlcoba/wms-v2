import { useState } from "react";
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
      <FilterCard onSearch={handleSearch} />
      <InventoryTable search={search} setSearch={setSearch} />
    </>
  );
}
