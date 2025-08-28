import { useState } from "react";
import FilterCard from "./FilterCard";
import type { BillingDTO } from "../../../@types/DTOs/BillingDTO";
import type { BillingFilterDTO } from "../../../@types/DTOs/BillingFilterDTO";
import HandlingInTable from "./HandlingInTable";
import { billingService } from "../../../services/billingService";
import HandlingOutTable from "./HandlingOutTable";
import BillingFooter from "./BillingFooter";
import StorageTable from "./StorageTable";

export default function IndexPage() {
  const [billing, setBilling] = useState<BillingDTO | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSearch = async (value: BillingFilterDTO) => {
    setIsLoading(true);
    const res = await billingService.Get(value);
    setBilling(res);
    setIsLoading(false);
  };

  return (
    <>
      <FilterCard
        onSearch={handleSearch}
        buttonProps={{
          loading: isLoading,
        }}
      />
      <HandlingInTable handlingIn={billing?.handlingIn} loading={isLoading} />
      <HandlingOutTable
        handlingOut={billing?.handlingOut}
        loading={isLoading}
      />
      <StorageTable storage={billing?.storage} loading={isLoading} />
      <BillingFooter billing={billing} />
    </>
  );
}
