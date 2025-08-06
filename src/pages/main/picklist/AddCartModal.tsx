import ModalComponent from "../../../components/ModalComponent/ModalComponent";
import type { CargoDetails } from "../../../@types/tables/CargoDetails";
import { FormikProvider, useFormik, type FormikHelpers } from "formik";
import usePage from "../../../hooks/usePage";
import { useQuery } from "@tanstack/react-query";
import { unitOfMeasurementService } from "../../../services/unitOfMeasurementService";
import SelectFormik from "../../../components/Formik/SelectFormik";
import type { RefUnitOfMeasurement } from "../../../@types/tables/RefUnitOfMeasurement";
import DatePickerFormik from "../../../components/Formik/DatePicker";
import InputNumberFormik from "../../../components/Formik/InputNumberFormik";
import { useEffect } from "react";
import { handleRoundOff } from "../../../utils/handleRoundOff";
import type { PickListDetailsRecord } from "../../../@types/tables/PickListDetailsRecord";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import { pickListDetailsRecordSchema } from "../../../schemas/pickListDetailsRecordSchema";
import type { PickListDetailsRecordDTO } from "../../../@types/DTOs/PicklistDetailsRecordDTO";
import { Alert, Card } from "antd";

type SaveModalProps = {
  open: boolean;
  handlePickListRecords: (values: PickListDetailsRecordDTO) => void;
  onCancel: () => void;
  selectedData: CargoDetails | null;
};

export default function AddCartModal(props: SaveModalProps) {
  const { open, handlePickListRecords, onCancel, selectedData } = props;
  const { title: pageTitle } = usePage();

  const { data: unitOfMeasurements } = useQuery({
    queryKey: ["unitOfMeasurements"],
    queryFn: async () => await unitOfMeasurementService.GetAll(),
    initialData: [],
  });

  const handleCancel = () => {
    onCancel();
    formik.resetForm();
  };
  const handleAddToCart = (
    value: PickListDetailsRecordDTO,
    formik: FormikHelpers<PickListDetailsRecordDTO>
  ) => {
    formik.setSubmitting(true);
    handlePickListRecords(value);
    formik.setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: {
      ...EMPTY_FORM,
      cargoDetails: selectedData,
    } as PickListDetailsRecordDTO,
    enableReinitialize: true,
    validationSchema: pickListDetailsRecordSchema,
    onSubmit: handleAddToCart,
  });
  const { getFieldProps, setFieldValue, values } = formik;

  useEffect(() => {
    const lengthCm = Number(getFieldProps(`cargoDetails.lengthCm`).value || 0);
    const heightCm = Number(getFieldProps(`cargoDetails.heightCm`).value || 0);
    const widthCm = Number(getFieldProps(`cargoDetails.widthCm`).value || 0);
    const quantity = Number(getFieldProps(`quantity`).value || 0);
    const cbm =
      (lengthCm / 100) * (heightCm / 100) * (widthCm / 100) * quantity;
    setFieldValue(`cubicMeter`, handleRoundOff(cbm));
  }, [getFieldProps(`quantity`).value]);

  return (
    <ModalComponent
      width={1000}
      title={`Add Pending ${pageTitle}`}
      open={open}
      onOk={() => formik.submitForm()}
      okText={"Add"}
      confirmLoading={formik.isSubmitting}
      onCancel={handleCancel}
    >
      <Alert
        message="Item will be added to Pending Picklist"
        description="This item is not yet scheduled for pickup and will be added to the pending picklist. You can manage it later from the picklist section."
        type="info"
        showIcon
        closable
        className="mb-2"
      />
      <FormikProvider value={formik}>
        <Card>
          <div className="row row-cols-lg-2 g-2">
            <div>
              <label>
                <strong>SKU:</strong> {values.cargoDetails?.skuCode}
              </label>
            </div>
            <div>
              <label>
                <strong>PRO No:</strong> {values.cargoDetails?.proNumber}
              </label>
            </div>
            <div>
              <label>
                <strong>Balance Pallete:</strong>{" "}
                {handleRoundOff(
                  (values.cargoDetails?.palleteCount ?? 0) -
                    (values?.palleteCount ?? 0)
                ) ?? 0}
              </label>
            </div>
            <div>
              <label>
                <strong>Balance Quantity:</strong>{" "}
                {handleRoundOff(
                  (values.cargoDetails?.quantity ?? 0) - (values?.quantity ?? 0)
                ) ?? 0}
              </label>
            </div>
            <div>
              <label>
                <strong>Balance CBM:</strong>{" "}
                {handleRoundOff(
                  (values.cargoDetails?.cubicMeter ?? 0) -
                    (values?.cubicMeter ?? 0)
                ) ?? 0}
              </label>
            </div>
            <div>
              <label>
                <strong>Dimension:</strong> {values.cargoDetails?.lengthCm} x{" "}
                {values.cargoDetails?.widthCm} x {values.cargoDetails?.heightCm}{" "}
                cm
              </label>
            </div>
          </div>
        </Card>
        <div className="row row-cols-lg-2 mt-4">
          <div>
            <DatePickerFormik<PickListDetailsRecord>
              label="Pull Out Date"
              name="pullOutDate"
              askterisk
            />
            <DatePickerFormik<PickListDetailsRecord>
              label="Pull Out Date Recieved"
              name="pullOutDateRecieved"
              askterisk
            />
            <DatePickerFormik<PickListDetailsRecord>
              label="Delivery Due Date"
              name="deliveryDueDate"
              askterisk
            />
            <SelectFormik<any, RefUnitOfMeasurement>
              label="Unit of Measurement"
              name="cargoDetails.unitOfMeasurementId"
              keyValue="id"
              keyLabel="name"
              option={unitOfMeasurements}
              askterisk
              disabled
            />
          </div>
          <div>
            <InputNumberFormik<PickListDetailsRecord>
              label="Quantity"
              name="quantity"
              min={0}
              askterisk
            />
            <InputNumberFormik<PickListDetailsRecord>
              label="Pallete Count"
              name="palleteCount"
              min={0}
              askterisk
            />
            <InputNumberFormik<PickListDetailsRecord>
              label="Cubic Meter"
              name="cubicMeter"
              disabled
              askterisk
            />
          </div>
        </div>
      </FormikProvider>
    </ModalComponent>
  );
}
