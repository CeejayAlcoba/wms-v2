import { useState } from "react";
import FilterCard from "./FilterCard";
import type { BillingDTO } from "../../../@types/DTOs/BillingDTO";
import type { BillingFilterDTO } from "../../../@types/DTOs/BillingFilterDTO";
import HandlingInTable from "./HandlingInTable";
import { billingService } from "../../../services/billingService";
import HandlingOutTable from "./HandlingOutTable";
import StorageTable from "./Storagetable";
import BillingFooter from "./BillingFooter";

export default function IndexPage() {
  const [billing, setBilling] = useState<BillingDTO | null>(null);

  const handleSearch = async (value: BillingFilterDTO) => {
    const res = await billingService.Get(value);
    setBilling(res);
  };

  return (
    <>
      <FilterCard onSearch={handleSearch} />
      <HandlingInTable handlingIn={billing?.handlingIn} />
      <HandlingOutTable handlingOut={billing?.handlingOut} />
      <StorageTable storage={billing?.storage} />
      <BillingFooter billing={billing} />
    </>
  );
}
