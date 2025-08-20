import { Button, Card } from "antd";
import { Form, FormikProvider, useFormik, type FormikHelpers } from "formik";
import { SearchOutlined } from "@ant-design/icons";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import type { BillingFilterDTO } from "../../../@types/DTOs/BillingFilterDTO";
import DateRangePickerFormik from "../../../components/Formik/DateRanegPicker";
import PrincipalProductSelect from "../../../components/Select/PrincipalCategorySelect";
import { billingFilterSchema } from "../../../schemas/billingFilterSchema";

export type FilterCardProps = {
  onSearch: (
    values: BillingFilterDTO,
    formikHelpers: FormikHelpers<BillingFilterDTO>
  ) => void | Promise<any>;
};

export default function FilterCard(props: FilterCardProps) {
  const { onSearch } = props;

  const formik = useFormik({
    initialValues: EMPTY_FORM,
    enableReinitialize: true,
    validationSchema: billingFilterSchema,
    onSubmit: onSearch,
  });

  return (
    <Card className="mb-2">
      <h6>Filters</h6>
      <FormikProvider value={formik}>
        <Form>
          <div className="row row-cols-lg-1">
            <DateRangePickerFormik<BillingFilterDTO>
              dateFromProps={{ name: "dateFrom", label: "Date To" }}
              dateToProps={{ name: "dateTo", label: "Date From" }}
            />
            <PrincipalProductSelect<BillingFilterDTO>
              principalName="principalId"
              productCategoryName="productCategoryId"
            />
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
