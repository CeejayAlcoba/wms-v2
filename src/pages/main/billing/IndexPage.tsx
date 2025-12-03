import { useEffect, useRef, useState } from "react";
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
import {
  EditOutlined,
  FilePdfOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { usePrint } from "../../../hooks/usePrint";
import { usePDF } from "../../../hooks/usePDF";
import IndexDocumentLayout from "./documentLayout/IndexDocument";
import BillingHeaderForm from "./BillingHeaderForm";
import { useFormik } from "formik";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import { billingFilterSchema } from "../../../schemas/billingFilterSchema";
import OtherServicesSaveModal from "../otherServiceBill/SaveModal";
import { handleMoney } from "../../../utils/handleMoney";

export default function IndexPage() {
  const [billing, setBilling] = useState<BillingDTO | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showHeader, setShowHeader] = useState<boolean>(false);
  const [isSearched, setIsSearched] = useState<boolean>(false);
  const [otherServicesSaveModal, setOtherServicesSaveModal] =
    useState<boolean>(false);

  const handleSearch = async (value: BillingFilterDTO) => {
    try {
      setIsLoading(true);
      const res = await billingService.Get(value);
      setBilling(res);
      setIsSearched(true);
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

  const handleChangeRefNumber = (value: string) => {
    if (billing)
      setBilling({
        ...billing,
        billingStatement: {
          ...billing.billingStatement,
          referenceNumber: value,
        },
      });
  };

  const filterFormik = useFormik<BillingFilterDTO>({
    initialValues: EMPTY_FORM,
    enableReinitialize: true,
    validationSchema: billingFilterSchema,
    onSubmit: handleSearch,
  });

  const handleAfterSaveOtherServices = () => {
    filterFormik.submitForm();
    setOtherServicesSaveModal(false);
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
    fontSize: 11,
    ref,
  });
  useEffect(() => {
    setIsSearched(false);
    setBilling(null);
  }, [filterFormik.values]);

  return (
    <div className="row row-cols-1 gap-2">
      <IndexDocumentLayout billing={billing} ref={ref} />
      <FilterCard
        filterFormik={filterFormik}
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
          disabled={!billing || !isSearched}
        >
          PDF
        </Button>
        <Button
          loading={isLoading}
          variant="outlined"
          color="primary"
          icon={<PrinterOutlined />}
          onClick={handlePrint}
          disabled={!billing || !isSearched}
        >
          PRINT
        </Button>
      </div>
      <BillingHeaderForm
        disabled={!isSearched}
        billing={{
          ...billing?.billingStatement,
          referenceNumber: billing?.billingStatement?.referenceNumber ?? "",
        }}
        handleChangeRefNumber={handleChangeRefNumber}
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
      <OtherServicesSaveModal
        disabledHeaders={true}
        open={otherServicesSaveModal}
        onAfterSave={handleAfterSaveOtherServices}
        onCancel={() => setOtherServicesSaveModal(false)}
        selectedData={billing?.billingStatement ?? null}
      />

      <OtherServicesTable
        add={{
          disabled: !isSearched,
          onClick: () => setOtherServicesSaveModal(true),
          children: "Edit",
          icon: <EditOutlined />,
        }}
        {...extendedTable<GroupBillType>()}
        title={() =>
          showHeader && <BillingTableHeader record={billingMapped()} />
        }
        otherServices={billing?.billingStatement?.otherServiceBills ?? []}
        record={billingMapped()}
        pagination={false}
        loading={isLoading}
      />

      {/* TOTAL FOOTER */}
      <div className="d-flex flex-column align-items-end">
        <div>
          <strong>Total </strong> {handleMoney(billing?.unVatableAmount)}
        </div>
        <div>
          <strong>VAT {billing?.vat}% </strong> {handleMoney(billing?.vatCost)}
        </div>
        <div>
          <strong>Total Amount </strong> {handleMoney(billing?.vatableAmount)}
        </div>
      </div>
    </div>
  );
}
