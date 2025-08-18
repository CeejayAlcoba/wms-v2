import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import type { RefCargoType } from "../../../@types/tables/RefCargoType";
import { Form, FormikProvider, useFormik, type FormikHelpers } from "formik";
import InputFormik from "../../../components/Formik/InputFormik";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import usePage from "../../../hooks/usePage";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import { cargoTypeSchema } from "../../../schemas/cargoTypeSchema";
import { cargoTypeService } from "../../../services/cargoTypeService";

type SaveModalProps = {
  open: boolean;
  onAfterSave: () => void;
  onCancel: () => void;
  selectedData: RefCargoType | null;
};

export default function SaveModal(props: SaveModalProps) {
  const { open, onAfterSave, onCancel, selectedData } = props;
  const { title: pageTitle } = usePage();

  const handleSave = async (
    values: RefCargoType,
    formik: FormikHelpers<RefCargoType>
  ) => {
    try {
      formik.setSubmitting(true);
      if (values.id) {
        await cargoTypeService.Update(values.id, values);
      } else {
        await cargoTypeService.Add(values);
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
    validationSchema: cargoTypeSchema,
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
          <InputFormik<RefCargoType> label="Name" askterisk name="name" />
        </Form>
      </FormikProvider>
    </ModalComponent>
  );
}
