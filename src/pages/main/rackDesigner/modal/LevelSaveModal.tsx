import { FormikProvider, useFormik, type FormikHelpers } from "formik";
import InputNumberFormik from "../../../../components/Formik/InputNumberFormik";
import { Modal, type ModalProps } from "antd";
import type { BayDetails } from "../../../../@types/tables/BayDetails";
import InputFormik from "../../../../components/Formik/InputFormik";
import type { BayDetailsGetDTO } from "../../../../@types/DTOs/BayDetailsGetDTO";

type SaveModalProps = {
  selectedBay: BayDetailsGetDTO | null;
  onSubmit: (
    values: BayDetailsGetDTO,
    formikHelpers: FormikHelpers<BayDetailsGetDTO>
  ) => void;
} & ModalProps;

const EMPTY_FORM: BayDetailsGetDTO = {
  name: null,
  numberOfShelves: null,
  numberOfOccupiedShelves: null,
  shelfDetails: [],
};

export default function LevelSaveModal({
  selectedBay,
  onSubmit,
  ...rest
}: SaveModalProps) {
  const formik = useFormik({
    initialValues: selectedBay ?? EMPTY_FORM,
    enableReinitialize: true,
    onSubmit,
  });

  return (
    <Modal
      {...rest}
      title="Update Bay"
      onOk={() => formik.submitForm()}
      okButtonProps={{ loading: formik.isSubmitting }}
    >
      <FormikProvider value={formik}>
        <InputFormik<BayDetails> name="name" label="Name" />
        <InputNumberFormik<BayDetails>
          name="numberOfShelves"
          label="No of Pallet(s):"
        />
      </FormikProvider>
    </Modal>
  );
}
