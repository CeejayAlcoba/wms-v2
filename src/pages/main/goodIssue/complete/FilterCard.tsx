import { Button, Card } from "antd";
import { Form, FormikProvider, useFormik, type FormikHelpers } from "formik";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import type { PickListDetails } from "../../../../@types/tables/PickListDetails";
import type { PickListDetailsRecordFilterDTO } from "../../../../@types/DTOs/PickListDetailsRecordFilterDTO";
import { pickListDetailsService } from "../../../../services/pickListDetailsService";
import SelectFormik from "../../../../components/Formik/SelectFormik";
import { EMPTY_FORM } from "../__constants__/EMPTY_FORM";
import type { GoodIssueDetails } from "../../../../@types/tables/GoodIssueDetails";
import { goodsReceiptService } from "../../../../services/goodsReceiptService";
import { SearchOutlined } from "@ant-design/icons";
import { goodIssueDetailsService } from "../../../../services/goodIssueDetailsService";
import InputFormik from "../../../../components/Formik/InputFormik";

export type FilterCardProps = {
  onSearch: (
    values: PickListDetails,
    formikHelpers: FormikHelpers<PickListDetailsRecordFilterDTO>
  ) => void | Promise<any>;
};

export default function FilterCard(props: FilterCardProps) {
  const { onSearch } = props;

  const formik = useFormik<GoodIssueDetails>({
    initialValues: EMPTY_FORM,
    enableReinitialize: true,
    onSubmit: onSearch,
  });

  const { data: goodIssues } = useQuery({
    queryKey: ["goodIssues"],
    queryFn: async () => {
      const res = await goodIssueDetailsService.GetAll();
      return res?.map((r) => ({ ...r, name: `GI-${r.id}` })) ?? [];
    },
    initialData: [],
  });
  const { data: picklists } = useQuery({
    queryKey: ["picklists"],
    queryFn: async () => {
      const res = await pickListDetailsService.GetAll({
        isNullGoodIssue: false,
      });
      return res?.map((r) => ({ ...r, name: `PL-${r.id}` })) ?? [];
    },
    initialData: [],
  });

  return (
    <Card className="mb-2">
      <h6>Filters</h6>
      <FormikProvider value={formik}>
        <Form>
          <div className="row row-cols-lg-3">
            <SelectFormik<GoodIssueDetails, any>
              label="Good Issue #"
              name="id"
              keyValue="id"
              keyLabel="name"
              option={goodIssues}
            />
            <InputFormik<GoodIssueDetails> label="OCR #" name="ocrNumber" />
            <SelectFormik<GoodIssueDetails, any>
              label="Pick List #"
              name="pickListDetailsId"
              keyValue="id"
              keyLabel="name"
              option={picklists}
            />
            <InputFormik<GoodIssueDetails> label="DOF #" name="dofNumber" />
            <InputFormik<GoodIssueDetails> label="Note" name="note" />
          </div>
          <div className="d-flex justify-content-end">
            <Button
              htmlType="submit"
              type="primary"
              onClick={() => formik.submitForm()}
              icon={<SearchOutlined />}
            >
              Search
            </Button>
          </div>
        </Form>
      </FormikProvider>
    </Card>
  );
}
