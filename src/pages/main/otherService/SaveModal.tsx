import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import type { RefOtherService } from "../../../@types/tables/RefOtherService";
import { Form, FormikProvider, useFormik, type FormikHelpers } from "formik";
import InputFormik from "../../../components/Formik/InputFormik";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import usePage from "../../../hooks/usePage";
import { otherServiceService } from "../../../services/otherServiceService";
import { otherServiceSchema } from "../../../schemas/otherServiceSchema.ts";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import InputNumberFormik from "../../../components/Formik/InputNumberFormik.tsx";
import OtherServiceFields from "./OtherServiceFields.tsx";
import type { OtherServiceDTO } from "../../../@types/DTOs/OtherServiceDTO.ts";
import { useEffect } from "react";
import Calculator from "./Calculator.tsx";

type SaveModalProps = {
  open: boolean;
  onAfterSave: () => void;
  onCancel: () => void;
  selectedData: OtherServiceDTO | null;
};

export default function SaveModal(props: SaveModalProps) {
  const { open, onAfterSave, onCancel, selectedData } = props;
  const { title: pageTitle } = usePage();

  const handleSave = async (
    values: OtherServiceDTO,
    formik: FormikHelpers<OtherServiceDTO>
  ) => {
    try {
      formik.setSubmitting(true);
      if (values.id) {
        await otherServiceService.Update(values.id, values);
      } else {
        await otherServiceService.Add(values);
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

  const formik = useFormik<OtherServiceDTO>({
    initialValues: selectedData ?? EMPTY_FORM,
    enableReinitialize: true,
    validationSchema: otherServiceSchema,
    onSubmit: handleSave,
  });
  const handleGetOtherService = async () => {
    if(!selectedData?.id) return;
    const res = await otherServiceService.GetById(selectedData?.id);
    if (res) formik.setValues({...res,previousFormula:res.formula});
  };

  useEffect(() => {
    const name: keyof OtherServiceDTO = "noOfFields";
    formik.setFieldValue(name, formik.values.otherServiceFields?.length ?? 0);
  }, [formik.values.otherServiceFields]);

  useEffect(() => {
    handleGetOtherService();
  }, [selectedData]);

  return (
    <ModalComponent
      title={`${selectedData ? "Update" : "Add"} ${pageTitle}`}
      open={open}
      onOk={() => formik.submitForm()}
      okText={selectedData ? "Update" : "Add"}
      confirmLoading={formik.isSubmitting}
      onCancel={handleCancel}
      width={1000}
    >
      <FormikProvider value={formik}>
        <Form>
          <InputFormik<RefOtherService> label="Name" askterisk name="name" />
          <InputNumberFormik<RefOtherService>
            label="Number of Fields"
            askterisk
            disabled
            name="noOfFields"
          />
          <OtherServiceFields />
          <Calculator />
        </Form>
      </FormikProvider>
    </ModalComponent>
  );
}
