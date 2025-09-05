import { useState } from "react";
import FilterCard from "./FilterCard";
import type { BillingDTO } from "../../../@types/DTOs/BillingDTO";
import type { BillingFilterDTO } from "../../../@types/DTOs/BillingFilterDTO";
import HandlingInTable from "./HandlingInTable";
import { billingService } from "../../../services/billingService";
import HandlingOutTable from "./HandlingOutTable";
import BillingFooter from "./BillingFooter";
import StorageTable from "./StorageTable";
import OtherServicesTable, {
  type GroupBillType,
} from "../otherServiceBill/OtherServicesTable";
import type { BillingStatementDTO } from "../../../@types/DTOs/BillingStatementDTO";
import BillingHeader from "./BillingTableHeader";
import type { TableComponentProps } from "../../../components/Table/TableComponent";
import type { HandlingInDetails } from "../../../@types/DTOs/BillingHandlingInDTO";
import type { HandlingOutDetails } from "../../../@types/DTOs/BillingHandlingOutDTO";
import BillingTableHeader from "./BillingTableHeader";
import type { StorageDetails } from "../../../@types/DTOs/BillingStorageDTO";
import BillingPrintAll from "./printAll/IndexPrint";

export default function IndexPage() {
  const [billing, setBilling] = useState<BillingDTO | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showHeader, setShowHeader] = useState<boolean>(false);

  const handleSearch = async (value: BillingFilterDTO) => {
    try {
      setIsLoading(true);
      const res = await billingService.Get(value);
      setBilling(res);
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  const billingMapped = () => {
    const result: BillingStatementDTO = {
      ...(billing?.billingStatement as BillingStatementDTO),
    };

    return result;
  };

  const handleBeforePrint = async () => {
    await setShowHeader(true);
  };
  const handleAfterPrint = async () => {
    await setShowHeader(false);
  };

  const extendedTable = <T extends object = any>(): TableComponentProps<T> => {
    return {
      print: {
        onBeforePrint: handleBeforePrint,
        onAfterPrint: handleAfterPrint,
      },
      pdf: {
        onBeforeDownload: handleBeforePrint,
        onAfterDownload: handleAfterPrint,
      },
      title: () => showHeader && <BillingHeader record={billingMapped()} />,
    };
  };

  return (
    <>
      <BillingPrintAll billing={billing} />
      <FilterCard
        onSearch={handleSearch}
        buttonProps={{
          loading: isLoading,
        }}
      />
      <HandlingInTable
        {...extendedTable<HandlingInDetails>()}
        handlingIn={billing?.handlingIn}
        loading={isLoading}
        title={() =>
          showHeader && <BillingTableHeader record={billingMapped()} />
        }
      />
      <HandlingOutTable
        {...extendedTable<HandlingOutDetails>()}
        handlingOut={billing?.handlingOut}
        loading={isLoading}
        title={() =>
          showHeader && <BillingTableHeader record={billingMapped()} />
        }
      />
      <StorageTable
        {...extendedTable<StorageDetails>()}
        storage={billing?.storage}
        loading={isLoading}
        title={() =>
          showHeader && <BillingTableHeader record={billingMapped()} />
        }
      />

      <OtherServicesTable
        {...extendedTable<GroupBillType>()}
        title={() =>
          showHeader && <BillingTableHeader record={billingMapped()} />
        }
        otherServices={billing?.billingStatement?.otherServiceBills ?? []}
        record={billingMapped()}
        pagination={false}
        loading={isLoading}
      />
      <BillingFooter billing={billing} />
    </>
  );
}
