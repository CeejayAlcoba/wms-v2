import * as yup from "yup";
import { requiredMessage } from "./yupInitials";
import type { GoodIssueDetails } from "../@types/tables/GoodIssueDetails";
import validateOCRNumber from "./utils/validateOCRNumber";

export const goodIssueDetailsSchema: yup.Schema<GoodIssueDetails> = yup
  .object()
  .shape({
    ocrNumber: yup
      .string()
      .required(requiredMessage)
      .test("unique-ocr", "OCR already exists.", async function (value) {
        const { id } = this.parent;
        if (!value) return true;

        const goodIssues: any = await validateOCRNumber(value);
        const isDuplicate = goodIssues.some((d: any) => d.id !== id);
        return !isDuplicate;
      }),
    note: yup.string().nullable(),
    dofNumber: yup.string().nullable(),
  });
