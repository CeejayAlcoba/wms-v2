import type { GoodIssueDetailsFilterDTO } from "../../../../@types/DTOs/GoodIssueDetailsFilterDTO";

export const EMPTY_FORM: GoodIssueDetailsFilterDTO = {
  id: null,
  ocrNumber: null,
  note: null,
  dofNumber: null,
  pickListDetailsId: null,
  currentPage: 1,
  pageSize: 10,
};
