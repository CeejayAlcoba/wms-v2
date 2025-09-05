import { useRef, useState } from "react";
import FilterCard from "./FilterCard";
import type { BillingDTO } from "../../../@types/DTOs/BillingDTO";
import type { BillingFilterDTO } from "../../../@types/DTOs/BillingFilterDTO";
import HandlingInTable from "./HandlingInTable";
import { billingService } from "../../../services/billingService";
import HandlingOutTable from "./HandlingOutTable";
import BillingFooter from "./BillingFooter";
import StorageTable from "./StorageTable";
import OtherServicesTable from "../otherServiceBill/OtherServicesTable";
import type { BillingStatementDTO } from "../../../@types/DTOs/BillingStatementDTO";
import BillingHeader from "./BillingTableHeader";
import type { TableComponentProps } from "../../../components/Table/TableComponent";
import type { HandlingInDetails } from "../../../@types/DTOs/BillingHandlingInDTO";
import type { HandlingOutDetails } from "../../../@types/DTOs/BillingHandlingOutDTO";
import BillingTableHeader from "./BillingTableHeader";
import type { StorageDetails } from "../../../@types/DTOs/BillingStorageDTO";
import type { GroupBillType } from "../../../utils/handleGroupOtherServices";
import { Button } from "antd";
import { FilePdfOutlined, PrinterOutlined } from "@ant-design/icons";
import { usePrint } from "../../../hooks/usePrint";
import { usePDF } from "../../../hooks/usePDF";
import DoumentLayout from "./documentLayout/IndexDoument";

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

  const ref = useRef(null);

  const { handlePrint } = usePrint({
    ref,
  });
  const { handleDownloadPDF } = usePDF({
    fontSize:11,
    ref,
  });

  return (
    <>
      <DoumentLayout billing={billing} ref={ref} />
      <FilterCard
        onSearch={handleSearch}
        buttonProps={{
          loading: isLoading,
        }}
      />
      <div className="d-flex justify-content-end gap-1">
        <Button
          loading={isLoading}
          variant="outlined"
          color="primary"
          icon={<FilePdfOutlined />}
          onClick={() => handleDownloadPDF("BillingStatement")}
          disabled={!billing}
        >
          PDF
        </Button>
        <Button
          loading={isLoading}
          variant="outlined"
          color="primary"
          icon={<PrinterOutlined />}
          onClick={handlePrint}
          disabled={!billing}
        >
          PRINT
        </Button>
      </div>

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
