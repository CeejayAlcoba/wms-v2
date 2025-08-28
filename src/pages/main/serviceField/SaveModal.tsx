import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import { Form, FormikProvider, useFormik, type FormikHelpers } from "formik";
import InputFormik from "../../../components/Formik/InputFormik";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import usePage from "../../../hooks/usePage";
import { serviceFieldService } from "../../../services/serviceFieldService";
import { serviceFieldSchema } from "../../../schemas/serviceFieldSchema";
import handleCamelize from "../../../utils/handleCamelize";
import type { RefServiceField } from "../../../@types/tables/RefServiceField";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";

type SaveModalProps = {
  open: boolean;
  onAfterSave: () => void;
  onCancel: () => void;
  selectedData: RefServiceField | null;
};

export default function SaveModal(props: SaveModalProps) {
  const { open, onAfterSave, onCancel, selectedData } = props;
  const { title: pageTitle } = usePage();

  const handleSave = async (
    values: RefServiceField,
    formik: FormikHelpers<RefServiceField>
  ) => {
    try {
      formik.setSubmitting(true);
      if (values.id) {
        await serviceFieldService.Update(values.id, values);
      } else {
        await serviceFieldService.Add(values);
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

  const formik = useFormik<RefServiceField>({
    initialValues: selectedData ?? EMPTY_FORM,
    enableReinitialize: true,
    validationSchema: serviceFieldSchema,
    onSubmit: handleSave,
  });

  const handleJsonKey = (e: string) => {
    const key = handleCamelize(e);
    let field: keyof RefServiceField = "jsonKey";
    formik.setFieldValue(field, key);
  };
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
          <InputFormik<RefServiceField>
            label="Name"
            askterisk
            name="name"
            onChange={(e) => handleJsonKey(e)}
          />
          <InputFormik<RefServiceField>
            label="Key"
            name="jsonKey"
            askterisk
            disabled
          />
        </Form>
      </FormikProvider>
    </ModalComponent>
  );
}
