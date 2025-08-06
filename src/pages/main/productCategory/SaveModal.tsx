import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import type { RefProductCategory } from "../../../@types/tables/RefProductCategory";
import { FormikProvider, useFormik, type FormikHelpers } from "formik";
import InputFormik from "../../../components/Formik/InputFormik";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import usePage from "../../../hooks/usePage";
import { productCategoryService } from "../../../services/productCategoryService";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import { principalService } from "../../../services/principalService";
import { useQuery } from "@tanstack/react-query";
import SelectFormik from "../../../components/Formik/SelectFormik";
import type { RefPrincipal } from "../../../@types/tables/RefPrincipal";
import { productCategorySchema } from "../../../schemas/productCategorySchema";

type SaveModalProps = {
  open: boolean;
  onAfterSave: () => void;
  onCancel: () => void;
  selectedData: RefProductCategory | null;
};

export default function SaveModal(props: SaveModalProps) {
  const { open, onAfterSave, onCancel, selectedData } = props;
  const { title: pageTitle } = usePage();
  const { data: principals } = useQuery({
    queryKey: ["principals"],
    queryFn: async () => await principalService.GetAll(),
    initialData: [],
  });

  const handleSave = async (
    values: RefProductCategory,
    formik: FormikHelpers<RefProductCategory>
  ) => {
    try {
      formik.setSubmitting(true);
      if (values.id) {
        await productCategoryService.Update(values.id, values);
      } else {
        await productCategoryService.Add(values);
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
    validationSchema: productCategorySchema,
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
        <InputFormik<RefProductCategory> label="Name" askterisk name="name" />
        <SelectFormik<RefProductCategory, RefPrincipal>
          label="Principal"
          askterisk
          name="principalId"
          keyValue="id"
          keyLabel="name"
          option={principals}
        />
      </FormikProvider>
    </ModalComponent>
  );
}
