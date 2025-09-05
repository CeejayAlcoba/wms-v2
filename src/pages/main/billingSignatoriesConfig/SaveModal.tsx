import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import { Form, FormikProvider, useFormik, type FormikHelpers } from "formik";
import InputFormik from "../../../components/Formik/InputFormik";
import { billingSignatoriesConfigSchema } from "../../../schemas/billingSignatoriesConfigSchema";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import { billingSignatoriesConfigService } from "../../../services/billingSignatoriesConfigService";
import usePage from "../../../hooks/usePage";
import { EMPTY_FORM } from "./__contants__/EMPTY_FORM";
import type { BillingSignatoriesConfig } from "../../../@types/tables/BillingSignatoriesConfig";
import InputNumberFormik from "../../../components/Formik/InputNumberFormik";

type SaveModalProps = {
  open: boolean;
  onAfterSave: () => void;
  onCancel: () => void;
  selectedData: BillingSignatoriesConfig | null;
};

export default function SaveModal(props: SaveModalProps) {
  const { open, onAfterSave, onCancel, selectedData } = props;
  const { title: pageTitle } = usePage();
  const handleSave = async (
    values: BillingSignatoriesConfig,
    formik: FormikHelpers<BillingSignatoriesConfig>
  ) => {
    try {
      formik.setSubmitting(true);
      if (values.id) {
        await billingSignatoriesConfigService.Update(values.id, values);
      } else {
        await billingSignatoriesConfigService.Add(values);
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
    validationSchema: billingSignatoriesConfigSchema,
    onSubmit: handleSave,
  });

  return (
    <ModalComponent
      title={`${selectedData ? "Update" : "Add"} ${pageTitle}`}
      open={open}
      onOk={() => formik.submitForm()}
      okButtonProps={{ htmlType: "submit" }}
      okText={selectedData ? "Update" : "Add"}
      confirmLoading={formik.isSubmitting}
      onCancel={handleCancel}
    >
      <FormikProvider value={formik}>
        <Form>
          <InputFormik<BillingSignatoriesConfig>
            label="Title"
            askterisk
            name="title"
          />
          <InputFormik<BillingSignatoriesConfig>
            label="Name"
            askterisk
            name="name"
          />
          <InputNumberFormik<BillingSignatoriesConfig>
            label="Sort Order"
            askterisk
            name="sortOrder"
          />
        </Form>
      </FormikProvider>
    </ModalComponent>
  );
}
