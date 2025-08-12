import ModalComponent from "../../../../components/ModalComponent/ModalComponent";
import type { PickListDetails } from "../../../../@types/tables/PickListDetails";
import { FormikProvider, useFormik, type FormikHelpers } from "formik";
import InputFormik from "../../../../components/Formik/InputFormik";
import SweetAlert from "../../../../components/SweetAlert/SweetAlert";
import usePage from "../../../../hooks/usePage";
import { pickListDetailsService } from "../../../../services/pickListDetailsService";
import { useQuery } from "@tanstack/react-query";
import SelectFormik from "../../../../components/Formik/SelectFormik";
import { Form } from "antd";
import type { RefTruckDetails } from "../../../../@types/tables/RefTruckDetails";
import { truckDetailsService } from "../../../../services/truckDetailsService";

type UpdateModalProps = {
  open: boolean;
  onAfterSave: () => void;
  onCancel: () => void;
  selectedData: PickListDetails | null;
};

export default function UpdateModal(props: UpdateModalProps) {
  const { open, onAfterSave, onCancel, selectedData } = props;

  const { data: truckDetails } = useQuery({
    queryKey: ["truckDetails"],
    queryFn: async () => await truckDetailsService.GetAll(),
    initialData: [],
  });

  const handleSave = async (
    values: PickListDetails,
    formik: FormikHelpers<PickListDetails>
  ) => {
    try {
      formik.setSubmitting(true);
      await pickListDetailsService.Update(values.id ?? 0, values);
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
    initialValues: selectedData ?? {},
    enableReinitialize: true,
    onSubmit: handleSave,
  });

  return (
    <ModalComponent
      width={1000}
      title={`${selectedData ? "Update" : "Add"} PL-${selectedData?.id}`}
      open={open}
      onOk={() => formik.submitForm()}
      okText={selectedData ? "Update" : "Add"}
      confirmLoading={formik.isSubmitting}
      onCancel={handleCancel}
    >
      <FormikProvider value={formik}>
        <Form>
          <div className="row row-cols-lg-3">
            <InputFormik<PickListDetails> label="Remarks" name="remarks" />
            <InputFormik<PickListDetails> label="Sold To" name="soldTo" />
            <InputFormik<PickListDetails>
              label="Delivered To"
              name="deliveredTo"
            />
            <InputFormik<PickListDetails> label="Pick Up By" name="pickUpBy" />
            <InputFormik<PickListDetails> label="PO Number" name="pONumber" />
            <InputFormik<PickListDetails> label="DO Number" name="dONumber" />
            <InputFormik<PickListDetails> label="Salesman" name="salesMan" />
            <SelectFormik<PickListDetails, RefTruckDetails>
              label="Truck Plate Number"
              name="truckDetailsId"
              keyLabel="plateNumber"
              keyValue="id"
              option={truckDetails}
            />
          </div>
        </Form>
      </FormikProvider>
    </ModalComponent>
  );
}
