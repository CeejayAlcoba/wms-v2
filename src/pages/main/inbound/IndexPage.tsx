import { useState } from "react";
import FilterCard from "./FilterCard";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import type { ReportInboundFilterDTO } from "../../../@types/DTOs/ReportInboundFilterDTO";
import InboundTable from "./InboundTable";

export default function IndexPage() {
  const [search, setSearch] = useState<ReportInboundFilterDTO>(EMPTY_FORM);

  const handleSearch = async (value: ReportInboundFilterDTO) => {
    await setSearch(value);
  };

  return (
    <>
      <FilterCard onSearch={handleSearch} />
      <InboundTable search={search} setSearch={setSearch} />
    </>
  );
}
