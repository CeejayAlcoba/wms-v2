import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import type { MasterBillType } from "../../../@types/tables/MasterBillType";
import { FormikProvider, useFormik, type FormikHelpers } from "formik";
import InputFormik from "../../../components/Formik/InputFormik";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import usePage from "../../../hooks/usePage";
import { billTypeService } from "../../../services/billTypeService";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import { billTypeSchema } from "../../../schemas/billTypeSchema";

type SaveModalProps = {
  open: boolean;
  onAfterSave: () => void;
  onCancel: () => void;
  selectedData: MasterBillType | null;
};

export default function SaveModal(props: SaveModalProps) {
  const { open, onAfterSave, onCancel, selectedData } = props;
  const { title: pageTitle } = usePage();

  const handleSave = async (
    values: MasterBillType,
    formik: FormikHelpers<MasterBillType>
  ) => {
    try {
      formik.setSubmitting(true);
      if (values.id) {
        await billTypeService.Update(values.id, values);
      } else {
        await billTypeService.Add(values);
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
    validationSchema: billTypeSchema,
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
        <InputFormik<MasterBillType> label="Name" askterisk name="name" />
      </FormikProvider>
    </ModalComponent>
  );
}
