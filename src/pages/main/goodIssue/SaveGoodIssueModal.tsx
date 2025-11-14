import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import type { GoodIssueDetails } from "../../../@types/tables/GoodIssueDetails";
import { FormikProvider, useFormik, type FormikHelpers } from "formik";
import InputFormik from "../../../components/Formik/InputFormik";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import { goodIssueDetailsService } from "../../../services/goodIssueDetailsService";
import { Form } from "antd";
import usePage from "../../../hooks/usePage";
import type { AxiosError } from "axios";
import { goodIssueDetailsSchema } from "../../../schemas/goodIssueDetailsSchema";

type SaveGoodIssueModalProps = {
  open: boolean;
  onAfterSave: () => void;
  onCancel: () => void;
  selectedData: GoodIssueDetails | null;
};

export default function SaveGoodIssueModal(props: SaveGoodIssueModalProps) {
  const { open, onAfterSave, onCancel, selectedData } = props;
  const { title: pageTitle } = usePage();

  const handleSave = async (
    values: GoodIssueDetails,
    formik: FormikHelpers<GoodIssueDetails>
  ) => {
    try {
      formik.setSubmitting(true);
      const newValue: GoodIssueDetails = {
        pickListDetailsId: selectedData?.pickListDetailsId,
        ...values,
      };
      let goodIssue: Partial<GoodIssueDetails> = {};
      if (newValue?.id) {
        goodIssue = await goodIssueDetailsService.Update(
          newValue.id ?? 0,
          newValue
        );
      } else {
        goodIssue = await goodIssueDetailsService.Add(newValue);
      }

      SweetAlert({
        title: `GI-${goodIssue?.id}`,
        text: `Successfully ${selectedData?.id ? "updated" : "added"}`,
        timer: undefined,
        showConfirmButton: true,
      });
      formik.resetForm();
      onAfterSave();
    } catch (e: any) {
      let ex: AxiosError = e;
      SweetAlert({
        icon: "error",
        timer: undefined,
        showConfirmButton: true,
        title: ex.response?.data ?? "Error occurs.",
      });
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
    validationSchema: goodIssueDetailsSchema,
    onSubmit: handleSave,
  });

  return (
    <ModalComponent
      width={1000}
      title={`${selectedData?.id ? `Update` : "Add"} ${pageTitle}${
        selectedData?.id ? `#${selectedData?.id}` : ""
      }  (PL-${selectedData?.pickListDetailsId})`}
      open={open}
      onOk={() => formik.submitForm()}
      okText={selectedData?.id ? "Update" : "Add"}
      confirmLoading={formik.isSubmitting}
      onCancel={handleCancel}
    >
      <FormikProvider value={formik}>
        <Form>
          <div className="row row-cols-lg-1">
            <InputFormik<GoodIssueDetails>
              label="OCR No."
              askterisk
              name="ocrNumber"
            />
            <InputFormik<GoodIssueDetails>
              label="DOF No."
              name="dofNumber"
            />
            <InputFormik<GoodIssueDetails> label="Note" name="note" />
          </div>
        </Form>
      </FormikProvider>
    </ModalComponent>
  );
}
