import ModalComponent from "../../../components/ModalComponent/ModalComponent.tsx";
import type { RefServiceConfig } from "../../../@types/tables/RefServiceConfig.ts";
import { Form, FormikProvider, useFormik, type FormikHelpers } from "formik";
import InputFormik from "../../../components/Formik/InputFormik.tsx";
import SweetAlert from "../../../components/SweetAlert/SweetAlert.ts";
import usePage from "../../../hooks/usePage.ts";
import { serviceConfigService } from "../../../services/serviceConfigService.ts";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM.ts";
import InputNumberFormik from "../../../components/Formik/InputNumberFormik.tsx";
import ServiceFields from "./ServiceFields.tsx";
import { useEffect } from "react";
import Calculator from "./Calculator.tsx";
import type { ServiceConfigDTO } from "../../../@types/DTOs/ServiceConfigDTO.ts";
import { serviceConfigSchema } from "../../../schemas/serviceConfigSchema.ts";

type SaveModalProps = {
  open: boolean;
  onAfterSave: () => void;
  onCancel: () => void;
  selectedData: ServiceConfigDTO | null;
};

export default function SaveModal(props: SaveModalProps) {
  const { open, onAfterSave, onCancel, selectedData } = props;
  const { title: pageTitle } = usePage();

  const handleSave = async (
    values: ServiceConfigDTO,
    formik: FormikHelpers<ServiceConfigDTO>
  ) => {
    try {
      formik.setSubmitting(true);
      if (values.id) {
        await serviceConfigService.Update(values.id, values);
      } else {
        await serviceConfigService.Add(values);
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

  const formik = useFormik<ServiceConfigDTO>({
    initialValues: selectedData ?? EMPTY_FORM,
    enableReinitialize: true,
    validationSchema: serviceConfigSchema,
    onSubmit: handleSave,
  });
  const handleGetOtherService = async () => {
    if (!selectedData?.id) return;
    const res = await serviceConfigService.GetById(selectedData?.id);
    if (res) formik.setValues({ ...res, previousFormula: res.displayFormula });
  };

  useEffect(() => {
    const name: keyof ServiceConfigDTO = "noOfFields";
    formik.setFieldValue(name, formik.values.serviceFields?.length ?? 0);
  }, [formik.values.serviceFields]);

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
          <InputFormik<RefServiceConfig> label="Name" askterisk name="name" />
          <InputNumberFormik<RefServiceConfig>
            label="Number of Fields"
            askterisk
            disabled
            name="noOfFields"
          />
          <ServiceFields />
          <Calculator />
        </Form>
      </FormikProvider>
    </ModalComponent>
  );
}
