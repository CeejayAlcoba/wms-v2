import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import type { RefTruckType } from "../../../@types/tables/RefTruckType";
import { FormikProvider, useFormik, type FormikHelpers } from "formik";
import InputFormik from "../../../components/Formik/InputFormik";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import usePage from "../../../hooks/usePage";
import { truckTypeService } from "../../../services/truckTypeService";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import { truckTypeSchema } from "../../../schemas/truckTypeSchema";

type SaveModalProps = {
  open: boolean;
  onAfterSave: () => void;
  onCancel: () => void;
  selectedData: RefTruckType | null;
};

export default function SaveModal(props: SaveModalProps) {
  const { open, onAfterSave, onCancel, selectedData } = props;
  const { title: pageTitle } = usePage();

  const handleSave = async (
    values: RefTruckType,
    formik: FormikHelpers<RefTruckType>
  ) => {
    try {
      formik.setSubmitting(true);
      if (values.id) {
        await truckTypeService.Update(values.id, values);
      } else {
        await truckTypeService.Add(values);
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
    validationSchema: truckTypeSchema,
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
        <InputFormik<RefTruckType> label="Name" askterisk name="name" />
      </FormikProvider>
    </ModalComponent>
  );
}
