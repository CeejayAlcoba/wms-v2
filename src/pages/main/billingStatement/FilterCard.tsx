import { Button, Card } from "antd";
import { Form, FormikProvider, useFormik, type FormikHelpers } from "formik";
import type { BillingStatement } from "../../../@types/tables/BillingStatement";
import { PercentageOutlined, SearchOutlined } from "@ant-design/icons";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import { useQuery } from "@tanstack/react-query";
import { principalService } from "../../../services/principalService";
import SelectFormik from "../../../components/Formik/SelectFormik";
import type { RefPrincipal } from "../../../@types/tables/RefPrincipal";
import InputNumberFormik from "../../../components/Formik/InputNumberFormik";

export type FilterCardProps = {
  onSearch: (
    values: BillingStatement,
    formikHelpers: FormikHelpers<BillingStatement>
  ) => void | Promise<any>;
};

export default function FilterCard(props: FilterCardProps) {
  const { onSearch } = props;

  const { data: principals } = useQuery({
    queryKey: ["principals"],
    queryFn: async () => await principalService.GetAll(),
    initialData: [],
  });
  const formik = useFormik({
    initialValues: EMPTY_FORM,
    enableReinitialize: true,
    onSubmit: onSearch,
  });

  return (
    <Card className="mb-2">
      <h6>Filters</h6>
      <FormikProvider value={formik}>
        <Form>
          <div className="row row-cols-lg-2">
            <SelectFormik<BillingStatement, RefPrincipal>
              label="Principal"
              name="principalId"
              keyValue="id"
              keyLabel="name"
              option={principals}
            />
            <InputNumberFormik<BillingStatement>
              addonAfter={<PercentageOutlined />}
              label="VAT"
              name="valueAddedTax"
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
