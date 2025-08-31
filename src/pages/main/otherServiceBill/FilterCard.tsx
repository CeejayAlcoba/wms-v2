import { Button, Card } from "antd";
import { Form, FormikProvider, useFormik, type FormikHelpers } from "formik";
import InputFormik from "../../../components/Formik/InputFormik";
import { SearchOutlined } from "@ant-design/icons";
import { EMPTY_SEARCH } from "./__contants__/EMPTY_SEARCH";
import PrincipalProductSelect from "../../../components/Select/PrincipalCategorySelect";
import DateRangePickerFormik from "../../../components/Formik/DateRangePickerFormik";
import type { BillingStatementFilterDTO } from "../../../@types/DTOs/BillingStatementFilterDTO";

export type FilterCardProps = {
  onSearch: (
    values: BillingStatementFilterDTO,
    formikHelpers: FormikHelpers<BillingStatementFilterDTO>
  ) => void | Promise<any>;
};

export default function FilterCard(props: FilterCardProps) {
  const { onSearch } = props;

  const formik = useFormik({
    initialValues: EMPTY_SEARCH,
    enableReinitialize: true,
    onSubmit: onSearch,
  });

  return (
    <Card className="mb-2">
      <h6>Filters</h6>
      <FormikProvider value={formik}>
        <Form>
          <div className="row row-cols-lg-2">
            <DateRangePickerFormik<BillingStatementFilterDTO>
              dateFromProps={{
                name: "dateFrom",
                label: "Date From",
              }}
              dateToProps={{
                name: "dateTo",
                label: "Date To",
              }}
            />
            <InputFormik<BillingStatementFilterDTO>
              label="Reference Number"
              askterisk
              name="referenceNumber"
            />
            <PrincipalProductSelect<BillingStatementFilterDTO>
              principalProps={{
                name: "principalId",
              }}
              productCategoryProps={{
                name: "productCategoryId",
              }}
            />
          </div>
          <div className="d-flex justify-content-end">
            <Button
              type="primary"
              htmlType="submit"
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
