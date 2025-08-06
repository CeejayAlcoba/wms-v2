import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import type { RefPrincipal } from "../../../@types/tables/RefPrincipal";
import { FormikProvider, useFormik, type FormikHelpers } from "formik";
import InputFormik from "../../../components/Formik/InputFormik";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import usePage from "../../../hooks/usePage";
import { principalService } from "../../../services/principalService";
import { principalSchema } from "../../../schemas/principalSchema";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";

type SaveModalProps = {
  open: boolean;
  onAfterSave: () => void;
  onCancel: () => void;
  selectedData: RefPrincipal | null;
};

export default function SaveModal(props: SaveModalProps) {
  const { open, onAfterSave, onCancel, selectedData } = props;
  const { title: pageTitle } = usePage();

  const handleSave = async (
    values: RefPrincipal,
    formik: FormikHelpers<RefPrincipal>
  ) => {
    try {
      formik.setSubmitting(true);
      if (values.id) {
        await principalService.Update(values.id, values);
      } else {
        await principalService.Add(values);
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
    validationSchema: principalSchema,
    onSubmit: handleSave,
  });

  return (
    <ModalComponent
      title={`${selectedData ? "Update" : "Add"} ${pageTitle}`}
      open={open}
      onOk={() => formik.submitForm()}
      okText={selectedData ? "Update" : "Add"}
      confirmLoading={formik.isSubmitting}
      onCancel={handleCancel}
    >
      <FormikProvider value={formik}>
        <InputFormik<RefPrincipal> label="Name" askterisk name="name" />
        <InputFormik<RefPrincipal> label="Other Name" name="otherName" />
        <InputFormik<RefPrincipal> label="Address" askterisk name="address" />
      </FormikProvider>
    </ModalComponent>
  );
}
