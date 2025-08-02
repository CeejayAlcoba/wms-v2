import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import type { RefTruckDetails } from "../../../@types/tables/RefTruckDetails";
import { FormikProvider, useFormik, type FormikHelpers } from "formik";
import InputFormik from "../../../components/Formik/InputFormik";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import usePage from "../../../hooks/usePage";
import { truckDetailsService } from "../../../services/truckDetailsService";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import { truckDetailsSchema } from "../../../schemas/truckDetailsSchema";
import type { RefTruckType } from "../../../@types/tables/RefTruckType";
import SelectFormik from "../../../components/Formik/SelectFormik";
import { useQuery } from "@tanstack/react-query";
import { truckTypeService } from "../../../services/truckTypeService";

type SameModalProps = {
  open: boolean;
  onAfterSave: () => void;
  onCancel: () => void;
  selectedData: RefTruckDetails | null;
};

export default function SaveModal(props: SameModalProps) {
  const { open, onAfterSave, onCancel, selectedData } = props;
  const { title: pageTitle } = usePage();

  const { data: truckTypes } = useQuery({
    queryKey: ["truckTypes"],
    queryFn: async () => await truckTypeService.GetAll(),
    initialData: [],
  });

  const handleSave = async (
    values: RefTruckDetails,
    formik: FormikHelpers<RefTruckDetails>
  ) => {
    try {
      formik.setSubmitting(true);
      if (values.id) {
        await truckDetailsService.Update(values.id, values);
      } else {
        await truckDetailsService.Add(values);
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
    validationSchema: truckDetailsSchema,
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
        <InputFormik<RefTruckDetails> label="Plate Number" name="plateNumber" />
        <InputFormik<RefTruckDetails> label="Driver Name" name="driverName" />
        <SelectFormik<RefTruckDetails, RefTruckType>
          label="Truck type"
          name="truckTypeId"
          keyValue="id"
          keyLabel="name"
          option={truckTypes}
        />
      </FormikProvider>
    </ModalComponent>
  );
}
