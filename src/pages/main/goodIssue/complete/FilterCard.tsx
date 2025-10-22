import { Button, Card } from "antd";
import { Form, FormikProvider, useFormik, type FormikHelpers } from "formik";
import type { PickListDetails } from "../../../../@types/tables/PickListDetails";
import type { PickListDetailsRecordFilterDTO } from "../../../../@types/DTOs/PickListDetailsRecordFilterDTO";
import { EMPTY_FORM } from "../__constants__/EMPTY_FORM";
import type { GoodIssueDetails } from "../../../../@types/tables/GoodIssueDetails";
import { SearchOutlined } from "@ant-design/icons";
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

  return (
    <Card className="mb-2">
      <h6>Filters</h6>
      <FormikProvider value={formik}>
        <Form>
          <div className="row row-cols-lg-3">
            <InputFormik<GoodIssueDetails>
              label="Good Issue #"
              name="id"
              prefix={"GI-"}
            />
            <InputFormik<GoodIssueDetails> label="OCR #" name="ocrNumber" />
            <InputFormik<GoodIssueDetails>
              label="Pick List #"
              name="pickListDetailsId"
              prefix={"PL-"}
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
