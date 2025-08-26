import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import type { RefOtherServiceField } from "../../../@types/tables/RefOtherServiceField";
import { Form, FormikProvider, useFormik, type FormikHelpers } from "formik";
import InputFormik from "../../../components/Formik/InputFormik";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import usePage from "../../../hooks/usePage";
import { otherServiceFieldService } from "../../../services/otherServiceFieldService";
import { otherServiceFieldSchema } from "../../../schemas/otherServiceFieldSchema";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import handleCamelize from "../../../utils/handleCamelize";

type SaveModalProps = {
  open: boolean;
  onAfterSave: () => void;
  onCancel: () => void;
  selectedData: RefOtherServiceField | null;
};

export default function SaveModal(props: SaveModalProps) {
  const { open, onAfterSave, onCancel, selectedData } = props;
  const { title: pageTitle } = usePage();

  const handleSave = async (
    values: RefOtherServiceField,
    formik: FormikHelpers<RefOtherServiceField>
  ) => {
    try {
      formik.setSubmitting(true);
      if (values.id) {
        await otherServiceFieldService.Update(values.id, values);
      } else {
        await otherServiceFieldService.Add(values);
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

  const formik = useFormik<RefOtherServiceField>({
    initialValues: selectedData ?? EMPTY_FORM,
    enableReinitialize: true,
    validationSchema: otherServiceFieldSchema,
    onSubmit: handleSave,
  });

  const handleJsonKey=(e:string)=>{
    const key = handleCamelize(e);
    let field : keyof RefOtherServiceField = "jsonKey";
    formik.setFieldValue(field,key);
  }
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
          <InputFormik<RefOtherServiceField>
            label="Name"
            askterisk
            name="name"
            onChange={(e)=>handleJsonKey(e)}
          />
          <InputFormik<RefOtherServiceField>
            label="Json Key"
            name="jsonKey"
            disabled
          />
        </Form>
      </FormikProvider>
    </ModalComponent>
  );
}
