import { Button } from "antd";
import useCurrentStep from "./__contexts__/useCurrentStep";
import { CHECK_IN_STEPS } from "./__constants__/CHECK_IN_STEPS";
import { CheckOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useFormikContext } from "formik";
import type { CheckInByICRDTO } from "../../../@types/DTOs/CheckInByICRDTO";
import SweetAlert from "../../../components/SweetAlert/SweetAlert";

type ButtonType = "Previous" | "Next" | "Submit";

export default function WizardButton() {
  const { currentStep, handleNext, handlePrev } = useCurrentStep();
  const { validateForm, setTouched, submitForm, isSubmitting } =
    useFormikContext<CheckInByICRDTO>();

  const handleValidateAndShowErrors = async (
    fieldKey: keyof CheckInByICRDTO
  ): Promise<boolean> => {
    const errors = await validateForm();
    const fieldError = errors?.[fieldKey];

    const hasError =
      typeof fieldError === "string" ||
      (fieldError &&
        typeof fieldError === "object" &&
        Object.keys(fieldError).length > 0);

    if (hasError) {
      const setTouchedRecursive = (value: any): any => {
        if (Array.isArray(value)) {
          return value.map((item) => setTouchedRecursive(item));
        }
        if (typeof value === "object" && value !== null) {
          const touchedObject: any = {};
          for (const key in value) {
            touchedObject[key] = setTouchedRecursive(value[key]);
          }
          return touchedObject;
        }
        return true;
      };

      setTouched({
        [fieldKey]: setTouchedRecursive(fieldError),
      });
    }

    return !hasError;
  };

  const handleClickButton = async (type: ButtonType) => {
    if (type == "Previous") return handlePrev();
    const isValidated = await handleValidateAndShowErrors(
      CHECK_IN_STEPS[currentStep].field
    );
    if (!isValidated) return;
    if (type == "Next") return handleNext();
    if (type == "Submit") {
      const errors = await validateForm();

      if (Object.keys(errors).length > 0) {
        const flatErrors = Object.values(errors).flatMap((err) =>
          Object.values(err)
        );
        SweetAlert({
          icon: "error",
          title: "Form has errors",
          timer: undefined,
          showConfirmButton: true,
          html: flatErrors?.join("<br/>"),
        });
        return;
      }
      submitForm();
      return;
    }
  };
  return (
    <>
      {currentStep > 0 && (
        <Button
          icon={<LeftOutlined />}
          style={{ margin: "0 8px" }}
          onClick={() => handleClickButton("Previous")}
        >
          Previous
        </Button>
      )}

      {currentStep < CHECK_IN_STEPS.length - 1 && (
        <Button
          type="primary"
          icon={<RightOutlined />}
          onClick={() => handleClickButton("Next")}
        >
          Next
        </Button>
      )}

      {currentStep === CHECK_IN_STEPS.length - 1 && (
        <Button
          type="primary"
          icon={<CheckOutlined />}
          onClick={() => handleClickButton("Submit")}
          loading={isSubmitting}
        >
          Submit
        </Button>
      )}
    </>
  );
}
