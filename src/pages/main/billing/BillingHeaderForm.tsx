import { Button, Card, type CardProps } from "antd";
import { Form, FormikProvider, useFormik, type FormikHelpers } from "formik";
import type { BillingStatementWithServiceReportDTO } from "../../../@types/DTOs/BillingStatementWithServiceReportDTO";
import { EMPTY_FORM } from "../otherServiceBill/__contants__/EMPTY_FORM";
import PrincipalProductSelect from "../../../components/Select/PrincipalCategorySelect";
import InputFormik from "../../../components/Formik/InputFormik";
import DateRangePickerFormik from "../../../components/Formik/DateRangePickerFormik";
import { billingStatementService } from "../../../services/billingStatementService";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import { billingStatementSchema } from "../../../schemas/billingStatementSchema";

type BillingHeaderFormProps = {
  disabled: boolean;
  billing: BillingStatementWithServiceReportDTO | null;
  handleChangeRefNumber: (value: string) => void;
} & CardProps;
export default function BillingHeaderForm(props: BillingHeaderFormProps) {
  const { billing, disabled, handleChangeRefNumber, ...rest } = props;

  const handleSave = async (
    values: BillingStatementWithServiceReportDTO,
    formikHelpers: FormikHelpers<BillingStatementWithServiceReportDTO>
  ) => {
    try {
      formikHelpers.setSubmitting(true);
      if (values.id) {
        await billingStatementService.Update(values.id, values);
      } else {
        await billingStatementService.Add(values);
      }
      SweetAlert({
        icon: "success",
        title: "Sucessfully Saved",
      });
    } catch {}

    formikHelpers.setSubmitting(false);
  };
  const formik = useFormik<BillingStatementWithServiceReportDTO>({
    initialValues: billing ?? EMPTY_FORM,
    enableReinitialize: true,
    onSubmit: handleSave,
    validationSchema: billingStatementSchema,
  });

  return (
    <Card {...rest} title="Header">
      <FormikProvider value={formik}>
        <Form>
          <div className="row row-cols-md-2">
            <DateRangePickerFormik<BillingStatementWithServiceReportDTO>
              dateFromProps={{
                name: "dateFrom",
                label: "Date From",
                disabled: true,
                askterisk: true,
              }}
              dateToProps={{
                name: "dateTo",
                label: "Date From",
                disabled: true,
                askterisk: true,
              }}
            />

            <PrincipalProductSelect<BillingStatementWithServiceReportDTO>
              principalProps={{
                name: "principalId",
                disabled: true,
                askterisk: true,
              }}
              productCategoryProps={{
                name: "productCategoryId",
                disabled: true,
                askterisk: true,
              }}
            />
            <InputFormik<BillingStatementWithServiceReportDTO>
              label="Ref No"
              name="referenceNumber"
              askterisk
              onChange={(val) => {
                handleChangeRefNumber(val);
              }}
            />
          </div>
          <div className="d-flex justify-content-end">
            <Button
              variant="outlined"
              color="primary"
              disabled={disabled}
              onClick={() => formik.submitForm()}
              loading={formik.isSubmitting}
            >
              Save
            </Button>
          </div>
        </Form>
      </FormikProvider>
    </Card>
  );
}
