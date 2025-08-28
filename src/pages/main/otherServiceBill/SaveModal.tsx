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
import { useEffect } from "react";
import { billingStatementSchema } from "../../../schemas/billingStatementSchema";

type SaveModalProps = {
  open: boolean;
  onAfterSave: () => void;
  onCancel: () => void;
  selectedData: BillingStatementWithServiceReportDTO | null;
};

export default function SaveModal(props: SaveModalProps) {
  const { open, onAfterSave, onCancel, selectedData } = props;
  const { title: pageTitle } = usePage();

  const handleSave = async (
    values: BillingStatementWithServiceReportDTO,
    formik: FormikHelpers<BillingStatementWithServiceReportDTO>
  ) => {
    try {
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

  const formik = useFormik({
    initialValues: selectedData ?? EMPTY_FORM,
    enableReinitialize: true,
    validationSchema: billingStatementSchema,
    onSubmit: handleSave,
  });

  const handleBillingStatement = async () => {
    if (!selectedData?.id) return;
    const billing = await billingStatementService.GetById(selectedData.id);
    formik.setValues(billing);
  };
  useEffect(() => {
    handleBillingStatement();
  }, [selectedData]);

  return (
    <ModalComponent
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
            }}
            dateToProps={{ name: "dateTo", label: "Date To", askterisk: true }}
          />
          <PrincipalProductSelect<BillingStatementWithServiceReportDTO>
            principalProps={{
              name: "principalId",
              askterisk: true,
            }}
            productCategoryProps={{
              name: "productCategoryId",
              askterisk: true,
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
