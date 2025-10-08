import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import { Form, FormikProvider, useFormik, type FormikHelpers } from "formik";
import InputFormik from "../../../components/Formik/InputFormik";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import usePage from "../../../hooks/usePage";
import { EMPTY_FORM } from "./__contants__/EMPTY_FORM";
import type { BillingStatementWithServiceReportDTO } from "../../../@types/DTOs/BillingStatementWithServiceReportDTO";
import DateRangePickerFormik from "../../../components/Formik/DateRangePickerFormik";
import PrincipalProductSelect from "../../../components/Select/PrincipalCategorySelect";
import OtherServiceBillArray from "./OtherServiceBillArray";
import { billingStatementService } from "../../../services/billingStatementService";
import { useEffect, useState } from "react";
import { billingStatementSchema } from "../../../schemas/billingStatementSchema";
import type { BillingStatementDTO } from "../../../@types/DTOs/BillingStatementDTO";

type SaveModalProps = {
  open: boolean;
  onAfterSave: () => void;
  onCancel: () => void;
  selectedData: BillingStatementWithServiceReportDTO | null;
  disabledHeaders?: boolean;
};

export default function SaveModal(props: SaveModalProps) {
  const {
    open,
    onAfterSave,
    onCancel,
    selectedData,
    disabledHeaders = false,
  } = props;
  const { title: pageTitle } = usePage();

  const [loading, setLoading] = useState<boolean>(false);
  const handleCheckDuplicate = async (
    values: BillingStatementWithServiceReportDTO
  ) => {
    const billingStatements: BillingStatementDTO[] =
      await billingStatementService.GetAll({
        ...values,
        id: null,
        referenceNumber: null,
      });
    if (billingStatements.length == 0) return false;
    else if (
      billingStatements.length > 1 ||
      billingStatements?.[0]?.id !== values.id
    ) {
      const error: string = "Duplicate entry found, please try another.";
      SweetAlert({
        icon: "error",
        showConfirmButton: true,
        timer: undefined,
        title: "Duplicate entry found, please try another.",
      });
      formik.setFieldError("dateTo", error);
      formik.setFieldError("dateFrom", error);
      return true;
    }

    return false;
  };

  const handleSave = async (
    values: BillingStatementWithServiceReportDTO,
    formik: FormikHelpers<BillingStatementWithServiceReportDTO>
  ) => {
    try {
      const isDuplicate = await handleCheckDuplicate(values);
      if (isDuplicate) return;

      formik.setSubmitting(true);
      if (values.id) {
        await billingStatementService.Update(values.id, values);
      } else {
        await billingStatementService.Add(values);
      }
      SweetAlert({
        title: `Successfully ${selectedData ? "updated" : "added"}`,
      });
      formik.resetForm();
      onAfterSave();
    } catch {
    } finally {
      formik.setSubmitting(false);
    }
  };

  const handleCancel = () => {
    onCancel();
    formik.resetForm();
  };

  const formik = useFormik<BillingStatementWithServiceReportDTO>({
    initialValues: selectedData?.id ? selectedData : EMPTY_FORM,
    enableReinitialize: true,
    validationSchema: billingStatementSchema,
    onSubmit: handleSave,
  });

  const handleBillingStatement = async () => {
    setLoading(true);
    if (!selectedData?.id) {
      formik.setValues({ ...selectedData });
    } else {
      const billing = await billingStatementService.GetById(selectedData.id);
      formik.setValues(billing);
    }
    setLoading(false);
  };
  useEffect(() => {
    handleBillingStatement();
  }, [selectedData]);

  return (
    <ModalComponent
      loading={loading}
      width={1500}
      title={`${selectedData ? "Update" : "Add"} ${pageTitle}`}
      open={open}
      onOk={() => formik.submitForm()}
      okText={selectedData ? "Update" : "Add"}
      confirmLoading={formik.isSubmitting}
      onCancel={handleCancel}
    >
      <FormikProvider value={formik}>
        <Form>
          <DateRangePickerFormik<BillingStatementWithServiceReportDTO>
            dateFromProps={{
              name: "dateFrom",
              label: "Date From",
              askterisk: true,
              disabled: disabledHeaders,
            }}
            dateToProps={{
              name: "dateTo",
              label: "Date To",
              askterisk: true,
              disabled: disabledHeaders,
            }}
          />
          <PrincipalProductSelect<BillingStatementWithServiceReportDTO>
            principalProps={{
              name: "principalId",
              askterisk: true,
              disabled: disabledHeaders,
            }}
            productCategoryProps={{
              name: "productCategoryId",
              askterisk: true,
              disabled: disabledHeaders,
            }}
          />

          <InputFormik<BillingStatementWithServiceReportDTO>
            label="Reference Number"
            askterisk
            name="referenceNumber"
          />
          <OtherServiceBillArray />
        </Form>
      </FormikProvider>
    </ModalComponent>
  );
}
