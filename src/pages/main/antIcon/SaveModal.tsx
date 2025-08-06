import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import type { MasterAntIcon } from "../../../@types/tables/MasterAntIcon";
import { FormikProvider, useFormik, type FormikHelpers } from "formik";
import InputFormik from "../../../components/Formik/InputFormik";
import AntIcon from "../../../components/AntIcon/AntIcon";
import { antIconSchema } from "../../../schemas/antIconSchema";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import { antIconService } from "../../../services/antIconService";
import usePage from "../../../hooks/usePage";
import { EMPTY_FORM } from "./__contants__/EMPTY_FORM";

type SaveModalProps = {
  open: boolean;
  onAfterSave: () => void;
  onCancel: () => void;
  selectedData: MasterAntIcon | null;
};

export default function SaveModal(props: SaveModalProps) {
  const { open, onAfterSave, onCancel, selectedData } = props;
  const { title: pageTitle } = usePage();
  const handleSave = async (
    values: MasterAntIcon,
    formik: FormikHelpers<MasterAntIcon>
  ) => {
    try {
      formik.setSubmitting(true);
      if (values.id) {
        await antIconService.Update(values.id, values);
      } else {
        await antIconService.Add(values);
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
    validationSchema: antIconSchema,
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
        <div className="d-flex justify-content-center">
          <AntIcon
            icon={formik.values.name ?? ""}
            size={40}
            className="p-2 border border-gray"
          />
        </div>

        <InputFormik<MasterAntIcon> label="Name" askterisk name="name" />
      </FormikProvider>
    </ModalComponent>
  );
}
