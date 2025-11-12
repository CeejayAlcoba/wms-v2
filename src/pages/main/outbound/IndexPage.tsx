import { useState } from "react";
import FilterCard from "./FilterCard";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import type { ReportOutboundFilterDTO } from "../../../@types/DTOs/ReportOutboundFilterDTO";
import OutboundTable from "./OutboundTable";

export default function IndexPage() {
  const [search, setSearch] = useState<ReportOutboundFilterDTO>(EMPTY_FORM);
  const handleSearch = async (value: ReportOutboundFilterDTO) => {
    await setSearch(value);
  };

  return (
    <>
      <FilterCard onSearch={handleSearch} />
      <OutboundTable search={search} setSearch={setSearch} />
    </>
  );
}
