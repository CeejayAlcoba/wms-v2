import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import { Form, FormikProvider, useFormik, type FormikHelpers } from "formik";
import InputFormik from "../../../components/Formik/InputFormik";
import AntIcon from "../../../components/AntIcon/AntIcon";
import { antIconSchema } from "../../../schemas/antIconSchema";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import usePage from "../../../hooks/usePage";
import { EMPTY_FORM } from "./__contants__/EMPTY_FORM";
import SelectFormik from "../../../components/Formik/SelectFormik";
import type { MasterSidebarMenuItem } from "../../../@types/tables/MasterSidebarMenuItem";
import { useQuery } from "@tanstack/react-query";
import { sidebarMenuItemService } from "../../../services/sidebarMenuItemService";
import { roleService } from "../../../services/roleService";
import type { BillingStatementWithServiceReportDTO } from "../../../@types/DTOs/BillingStatementWithServiceReportDTO";
import DatePickerFormik from "../../../components/Formik/DatePicker";
import DateRangePickerFormik from "../../../components/Formik/DateRanegPicker";
import PrincipalProductSelect from "../../../components/Select/PrincipalCategorySelect";
import OtherServiceReportArray from "./OtherServiceReportArray";
import { billingStatementService } from "../../../services/billingStatementService";
import { useEffect } from "react";

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
    console.log(values)
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
    onSubmit: handleSave,
  });

 const handleBillingStatement=async()=>{
    if(!selectedData?.id) return;
    const billing = await billingStatementService.GetById(selectedData.id)
    formik.setValues(billing)
  }
  useEffect(()=>{
   handleBillingStatement()
  },[selectedData])

  return (
    <ModalComponent
    width={1000}
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
            principalName="principalId"
            productCategoryName="productCategoryId"
          />

          <InputFormik<BillingStatementWithServiceReportDTO>
            label="Reference Number"
            askterisk
            name="referenceNumber"
          />
          <OtherServiceReportArray/>
        </Form>
      </FormikProvider>
    </ModalComponent>
  );
}
