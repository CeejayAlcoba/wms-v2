import { Card, Steps } from "antd";
import { useEffect, useState } from "react";
import { CurrentStepContext } from "./__contexts__/useCurrentStep";
import { CHECK_IN_STEPS } from "./__constants__/CHECK_IN_STEPS";
import WizardButton from "./WizardButton";
import { FormikProvider, useFormik, type FormikHelpers } from "formik";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import { checkInByICRSchema } from "../../../schemas/checkInByICRSchema";
import type { CheckInByICRDTO } from "../../../@types/DTOs/CheckInByICRDTO";
import { checkInByICRService } from "../../../services/checkInByICRService";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";
import { indexDbService } from "../../../services/indexDbService";

export default function IndexPage() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };
  const handleSubmit = async (
    values: CheckInByICRDTO,
    formikHelpers: FormikHelpers<CheckInByICRDTO>
  ) => {
    try {
      formikHelpers.setSubmitting(true);
      await checkInByICRService.Add(values);
      SweetAlert({
        title: "ICR Check-In Completed",
        timer: undefined,
        showConfirmButton: true,
      });
      formik.resetForm();
      setCurrentStep(0);
      await indexDbService.deleteItem("checkInByICR",1)
    } catch {
      SweetAlert({
        title: "Error Occurs",
        icon: "error",
        timer: undefined,
        showConfirmButton: true,
      });
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleStep = () => {
    return CHECK_IN_STEPS[currentStep];
  };

  const formik = useFormik({
    validationSchema: checkInByICRSchema,
    initialValues: EMPTY_FORM,
    onSubmit: handleSubmit,
  });

  const handleSaveIndexDB = async () => {
    const value = formik.values as CheckInByICRDTO;
    await indexDbService.upsertItem("checkInByICR", { ...value, id: 1 });
  };
  const handleRestorValue = async () => {
    const value = await indexDbService.getItem("checkInByICR", 1);
    if (value) {
      formik.setValues(value);
    }
  };

  useEffect(() => {
    handleSaveIndexDB();
  }, [formik.values]);

  useEffect(() => {
    handleRestorValue();
  }, []);

  return (
    <FormikProvider value={formik}>
      <CurrentStepContext value={{ currentStep, handlePrev, handleNext }}>
        <div className="row gap-4">
          <Steps current={currentStep} items={CHECK_IN_STEPS} />
          <Card title={handleStep().title}>{handleStep().componentPage}</Card>
          <div className="d-flex justify-content-end">
            <WizardButton />
          </div>
        </div>
      </CurrentStepContext>
    </FormikProvider>
  );
}
