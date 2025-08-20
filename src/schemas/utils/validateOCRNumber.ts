import { goodIssueDetailsService } from "../../services/goodIssueDetailsService";

let checkTimeOut: ReturnType<typeof setTimeout>;

const validateOCRNumber = (value: string) => {
  if (checkTimeOut) clearTimeout(checkTimeOut);

  return new Promise((resolve) => {
    checkTimeOut = setTimeout(async () => {
      const goodIssues = await goodIssueDetailsService.GetAll({
        ocrNumber: value,
      });
      resolve(goodIssues);
    }, 500);
  });
};

export default validateOCRNumber;
