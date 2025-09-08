import { Button, Card, type ButtonProps } from "antd";
import {
  Form,
  FormikProvider,
  type FormikContextType,
} from "formik";
import { SearchOutlined } from "@ant-design/icons";
import type { BillingFilterDTO } from "../../../@types/DTOs/BillingFilterDTO";
import DateRangePickerFormik from "../../../components/Formik/DateRangePickerFormik";
import PrincipalProductSelect from "../../../components/Select/PrincipalCategorySelect";

export type FilterCardProps = {
  filterFormik: FormikContextType<BillingFilterDTO>;
  buttonProps?: ButtonProps;
};

export default function FilterCard(props: FilterCardProps) {
  const { filterFormik, buttonProps } = props;

  return (
    <Card className="mb-2">
      <h6>Filters</h6>
      <FormikProvider value={filterFormik}>
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
              onClick={() => filterFormik.submitForm()}
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
