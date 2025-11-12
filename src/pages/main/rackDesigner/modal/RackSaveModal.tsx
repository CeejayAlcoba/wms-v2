import { FormikProvider, useFormik, type FormikHelpers } from "formik";
import { Modal, type ModalProps } from "antd";
import type { RackDetailsDTO } from "../../../../@types/DTOs/RackDetailsDTO";
import InputFormik from "../../../../components/Formik/InputFormik";
import BayFormikArray from "./BayFormikArray";

type RackSaveModalProps = {
  selectedRack?: RackDetailsDTO | null;
  onSubmit: (
    values: RackDetailsDTO,
    formikHelpers: FormikHelpers<RackDetailsDTO>
  ) => void;
} & ModalProps;

const EMPTY_FORM: RackDetailsDTO = {
  bayDetails: [],
};

export default function RackSaveModal({
  selectedRack,
  onSubmit,
  ...rest
}: RackSaveModalProps) {
  const formik = useFormik({
    initialValues: selectedRack?.id ? selectedRack : EMPTY_FORM,
    enableReinitialize: true,
    onSubmit: onSubmit,
  });
  return (
    <Modal
      okText={selectedRack?.id ? "Update" : "Add"}
      onOk={() => formik.submitForm()}
      okButtonProps={{ loading: formik.isSubmitting }}
      title={`${selectedRack?.id ? "Update" : "New"} Rack ${
        selectedRack?.name ?? ""
      }`}
      {...rest}
    >
      <FormikProvider value={formik}>
        <InputFormik<RackDetailsDTO> name="description" label="Name" />
        <BayFormikArray />
      </FormikProvider>
    </Modal>
  );
}
