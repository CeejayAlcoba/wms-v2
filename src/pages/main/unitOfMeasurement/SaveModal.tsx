import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import type { RefUnitOfMeasurement } from "../../../@types/tables/RefUnitOfMeasurement";
import { Form, FormikProvider, useFormik, type FormikHelpers } from "formik";
import InputFormik from "../../../components/Formik/InputFormik";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import usePage from "../../../hooks/usePage";
import { unitOfMeasurementService } from "../../../services/unitOfMeasurementService";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import { unitOfMeasurementSchema } from "../../../schemas/unitOfMeasurementSchema.ts";

type SaveModalProps = {
  open: boolean;
  onAfterSave: () => void;
  onCancel: () => void;
  selectedData: RefUnitOfMeasurement | null;
};

export default function SaveModal(props: SaveModalProps) {
  const { open, onAfterSave, onCancel, selectedData } = props;
  const { title: pageTitle } = usePage();

  const handleSave = async (
    values: RefUnitOfMeasurement,
    formik: FormikHelpers<RefUnitOfMeasurement>
  ) => {
    try {
      formik.setSubmitting(true);
      if (values.id) {
        await unitOfMeasurementService.Update(values.id, values);
      } else {
        await unitOfMeasurementService.Add(values);
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
    validationSchema: unitOfMeasurementSchema,
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
        <Form>
          <InputFormik<RefUnitOfMeasurement>
            label="Name"
            askterisk
            name="name"
          />
        </Form>
      </FormikProvider>
    </ModalComponent>
  );
}
