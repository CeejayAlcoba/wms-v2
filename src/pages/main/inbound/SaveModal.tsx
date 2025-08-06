import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import type { CargoDetails } from "../../../@types/tables/CargoDetails";
import { FormikProvider, useFormik, type FormikHelpers } from "formik";
import InputFormik from "../../../components/Formik/InputFormik";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import usePage from "../../../hooks/usePage";
import { principalSchema } from "../../../schemas/principalSchema";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import { cargoDetailsService } from "../../../services/cargoDetailsService";
import { useQuery } from "@tanstack/react-query";
import { unitOfMeasurementService } from "../../../services/unitOfMeasurementService";
import SelectFormik from "../../../components/Formik/SelectFormik";
import type { RefUnitOfMeasurement } from "../../../@types/tables/RefUnitOfMeasurement";
import type { ShelfDetails } from "../../../@types/tables/ShelfDetails";
import DatePickerFormik from "../../../components/Formik/DatePicker";
import { InputNumber } from "antd";
import InputNumberFormik from "../../../components/Formik/InputNumberFormik";
import { cargoDetailsSchema } from "../../../schemas/cargoDetailsSchema";
import { useEffect } from "react";
import { handleRoundOff } from "../../../utils/handleRoundOff";

type SaveModalProps = {
  open: boolean;
  onAfterSave: () => void;
  onCancel: () => void;
  selectedData: CargoDetails | null;
};

export default function SaveModal(props: SaveModalProps) {
  const { open, onAfterSave, onCancel, selectedData } = props;
  const { title: pageTitle } = usePage();

  const { data: unitOfMeasurements } = useQuery({
    queryKey: ["unitOfMeasurements"],
    queryFn: async () => await unitOfMeasurementService.GetAll(),
    initialData: [],
  });

  const handleSave = async (
    values: CargoDetails,
    formik: FormikHelpers<CargoDetails>
  ) => {
    try {
      formik.setSubmitting(true);
      if (values.id) {
        await cargoDetailsService.Update(values.id, values);
      } else {
        await cargoDetailsService.Add(values);
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
    validationSchema: cargoDetailsSchema,
    onSubmit: handleSave,
  });
  const { getFieldProps, setFieldValue } = formik;

  useEffect(() => {
    const lengthCm = Number(getFieldProps(`lengthCm`).value || 0);
    const heightCm = Number(getFieldProps(`heightCm`).value || 0);
    const widthCm = Number(getFieldProps(`widthCm`).value || 0);
    const quantity = Number(getFieldProps(`quantity`).value || 0);

    const cbm =
      (lengthCm / 100) * (heightCm / 100) * (widthCm / 100) * quantity;

    setFieldValue(`cubicMeter`, handleRoundOff(cbm));
  }, [
    getFieldProps(`lengthCm`).value,
    getFieldProps(`heightCm`).value,
    getFieldProps(`widthCm`).value,
    getFieldProps(`quantity`).value,
  ]);

  return (
    <ModalComponent
      width={1000}
      title={`${selectedData ? "Update" : "Add"} ${pageTitle}`}
      open={open}
      onOk={() => formik.submitForm()}
      okText={selectedData ? "Update" : "Add"}
      confirmLoading={formik.isSubmitting}
      onCancel={handleCancel}
    >
      <FormikProvider value={formik}>
        <div className="row row-cols-lg-4">
          <InputFormik<CargoDetails>
            label="SKU Code"
            name="skuCode"
            askterisk
          />
          <InputFormik<CargoDetails>
            label="PRO Number"
            name="proNumber"
            askterisk
          />
          <InputFormik<CargoDetails>
            label="Description"
            name="description"
            askterisk
          />
          <InputFormik<CargoDetails>
            label="Delivery Note"
            name="deliveryNote"
          />
          <SelectFormik<CargoDetails, RefUnitOfMeasurement>
            label="Unit of Measurement"
            name="unitOfMeasurementId"
            keyValue="id"
            keyLabel="name"
            option={unitOfMeasurements}
            askterisk
          />
          <InputFormik<CargoDetails> label="Batch No" name="batchNo" />
          <DatePickerFormik<CargoDetails>
            label="Expiration Date"
            name="expirationDate"
            askterisk
          />
          <InputFormik<CargoDetails>
            label="Pallete Count"
            name="palleteCount"
            askterisk
          />
          <InputFormik<CargoDetails>
            label="Quantity"
            name="quantity"
            askterisk
          />
          <InputNumberFormik<CargoDetails>
            label="Length"
            name="lengthCm"
            addonAfter="cm"
            askterisk
          />
          <InputNumberFormik<CargoDetails>
            label="Height"
            name="heightCm"
            addonAfter="cm"
            askterisk
          />
          <InputNumberFormik<CargoDetails>
            label="Width"
            name="widthCm"
            addonAfter="cm"
            askterisk
          />
          <InputNumberFormik<CargoDetails>
            label="Cubic Meter"
            name="cubicMeter"
            disabled
            askterisk
          />
          <InputFormik<CargoDetails>
            label="Customer Name"
            name="customerName"
          />
          <SelectFormik<CargoDetails, ShelfDetails>
            label="Bin Location"
            name="shelfDetailsId"
            keyValue="id"
            keyLabel="name"
            option={[]}
          />
          <InputFormik<CargoDetails>
            prefix="₱"
            label="Total Amount"
            name="totalAmount"
            askterisk
          />
        </div>
      </FormikProvider>
    </ModalComponent>
  );
}
