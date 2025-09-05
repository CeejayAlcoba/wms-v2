import { Button, Card, type ButtonProps } from "antd";
import { Form, FormikProvider, useFormik, type FormikHelpers } from "formik";
import { SearchOutlined } from "@ant-design/icons";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import type { BillingFilterDTO } from "../../../@types/DTOs/BillingFilterDTO";
import DateRangePickerFormik from "../../../components/Formik/DateRangePickerFormik";
import PrincipalProductSelect from "../../../components/Select/PrincipalCategorySelect";
import { billingFilterSchema } from "../../../schemas/billingFilterSchema";

export type FilterCardProps = {
  onSearch: (
    values: BillingFilterDTO,
    formikHelpers: FormikHelpers<BillingFilterDTO>
  ) => void | Promise<any>;
  buttonProps?: ButtonProps;
};

export default function FilterCard(props: FilterCardProps) {
  const { onSearch, buttonProps } = props;

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
              dateFromProps={{
                name: "dateFrom",
                label: "Date To",
                askterisk: true,
              }}
              dateToProps={{
                name: "dateTo",
                label: "Date From",
                askterisk: true,
              }}
            />
            <PrincipalProductSelect<BillingFilterDTO>
              principalProps={{
                name: "principalId",
                askterisk: true,
                onChange: () => {},
              }}
              productCategoryProps={{
                name: "productCategoryId",
                askterisk: true,
              }}
            />
          </div>

          <div className="d-flex justify-content-end">
            <Button
              htmlType="submit"
              type="primary"
              onClick={() => formik.submitForm()}
              icon={<SearchOutlined />}
              {...buttonProps}
            >
              Search
            </Button>
          </div>
        </Form>
      </FormikProvider>
    </Card>
  );
}
