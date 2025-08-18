import ModalComponent from "../../../../components/ModalComponent/ModalComponent";
import { Form, FormikProvider, useFormik, type FormikHelpers } from "formik";
import usePage from "../../../../hooks/usePage";
import { useQuery } from "@tanstack/react-query";
import { unitOfMeasurementService } from "../../../../services/unitOfMeasurementService";
import SelectFormik from "../../../../components/Formik/SelectFormik";
import type { RefUnitOfMeasurement } from "../../../../@types/tables/RefUnitOfMeasurement";
import DatePickerFormik from "../../../../components/Formik/DatePicker";
import InputNumberFormik from "../../../../components/Formik/InputNumberFormik";
import { useEffect } from "react";
import { handleRoundOff } from "../../../../utils/handleRoundOff";
import type { PickListDetailsRecord } from "../../../../@types/tables/PickListDetailsRecord";
import { pickListDetailsRecordSchema } from "../../../../schemas/pickListDetailsRecordSchema";
import type { PickListDetailsRecordDTO } from "../../../../@types/DTOs/PicklistDetailsRecordDTO";
import { Alert, Card } from "antd";
import { indexDbService } from "../../../../services/indexDbService";
import { EMPTY_PICKLIST_RECORD } from "../__constants__/EMPTY_PICKLIST_RECORD";

type AddPendingModalProps = {
  open: boolean;
  onAfterSave: (values: PickListDetailsRecordDTO) => void;
  onCancel: () => void;
  selectedData: PickListDetailsRecordDTO | null;
  type: "Add" | "Update";
};

export default function AddPendingModal(props: AddPendingModalProps) {
  const { open, onAfterSave, onCancel, selectedData, type } = props;
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

  const handleAddToCart = async (
    value: PickListDetailsRecordDTO,
    formik: FormikHelpers<PickListDetailsRecordDTO>
  ) => {
    formik.setSubmitting(true);
    onAfterSave(value);
    await indexDbService.addItem("pendingPickList", {
      ...value,
      cargoDetailsId: value.report?.id,
      id: value?.report?.id ?? 0,
    });
    formik.resetForm();
    formik.setSubmitting(false);
  };

  const handleUpdate = async (
    value: PickListDetailsRecordDTO,
    formik: FormikHelpers<PickListDetailsRecordDTO>
  ) => {
    formik.setSubmitting(true);
    await indexDbService.updateItem("pendingPickList", value?.report?.id ?? 0, {
      ...value,
      cargoDetailsId: value.report?.id,
      id: value?.report?.id ?? 0,
    });
    onAfterSave(value);
    formik.resetForm();
    formik.setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: selectedData ? selectedData : EMPTY_PICKLIST_RECORD,
    enableReinitialize: true,
    validationSchema: pickListDetailsRecordSchema,
    onSubmit: type == "Add" ? handleAddToCart : handleUpdate,
  });
  const { getFieldProps, setFieldValue, values } = formik;

  useEffect(() => {
    console.log(values);
    const lengthCm = Number(getFieldProps(`report.lengthCm`).value || 0);
    const heightCm = Number(getFieldProps(`report.heightCm`).value || 0);
    const widthCm = Number(getFieldProps(`report.widthCm`).value || 0);
    const quantity = Number(getFieldProps(`quantity`).value || 0);
    const cbm =
      (lengthCm / 100) * (heightCm / 100) * (widthCm / 100) * quantity;
    if (cbm >= (values.report?.balanceCubicMeter ?? 0)) {
      setFieldValue(
        `cubicMeter`,
        handleRoundOff(values.report?.balanceCubicMeter ?? 0)
      );
    } else {
      setFieldValue(`cubicMeter`, handleRoundOff(cbm));
    }
  }, [getFieldProps(`quantity`).value]);

  return (
    <ModalComponent
      width={1000}
      title={`${type} Pending ${pageTitle}`}
      open={open}
      onOk={() => formik.submitForm()}
      okText={type}
      confirmLoading={formik.isSubmitting}
      onCancel={handleCancel}
    >
      {type == "Add" && (
        <Alert
          message="Item will be added to Pending Picklist"
          description="This item is not yet scheduled for pickup and will be added to the pending picklist. You can manage it later from the picklist section."
          type="info"
          showIcon
          closable
          className="mb-2"
        />
      )}
      <FormikProvider value={formik}>
        <Form>
          <Card>
            <div className="row row-cols-lg-2 g-2">
              <div>
                <label>
                  <strong>SKU:</strong> {values.report?.skuCode}
                </label>
              </div>
              <div>
                <label>
                  <strong>PRO No:</strong> {values.report?.proNumber}
                </label>
              </div>
              <div>
                <label>
                  <strong>Balance Pallete:</strong>{" "}
                  {handleRoundOff(
                    (values.report?.balancePalleteCount ?? 0) -
                      (values?.palleteCount ?? 0)
                  ) ?? 0}
                </label>
              </div>
              <div>
                <label>
                  <strong>Balance Quantity:</strong>{" "}
                  {handleRoundOff(
                    (values.report?.balanceQuantity ?? 0) -
                      (values?.quantity ?? 0)
                  ) ?? 0}
                </label>
              </div>
              <div>
                <label>
                  <strong>Balance CBM:</strong>{" "}
                  {handleRoundOff(
                    (values.report?.balanceCubicMeter ?? 0) -
                      (values?.cubicMeter ?? 0)
                  ) ?? 0}
                </label>
              </div>
              <div>
                <label>
                  <strong>Dimension:</strong> {values.report?.lengthCm} x{" "}
                  {values.report?.widthCm} x {values.report?.heightCm} cm
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
                name="report.unitOfMeasurementId"
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
              />
              <InputNumberFormik<PickListDetailsRecord>
                label="Cubic Meter"
                name="cubicMeter"
                disabled
                askterisk
              />
            </div>
          </div>
        </Form>
      </FormikProvider>
    </ModalComponent>
  );
}
