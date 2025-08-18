import { Button, Card } from "antd";
import { Form, FormikProvider, useFormik, type FormikHelpers } from "formik";
import InputFormik from "../../../components/Formik/InputFormik";
import type { RefProductCategory } from "../../../@types/tables/RefProductCategory";
import { SearchOutlined } from "@ant-design/icons";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import SelectFormik from "../../../components/Formik/SelectFormik";
import type { RefPrincipal } from "../../../@types/tables/RefPrincipal";

import { principalService } from "../../../services/principalService";
import { useQuery } from "@tanstack/react-query";

export type FilterCardProps = {
  onSearch: (
    values: RefProductCategory,
    formikHelpers: FormikHelpers<RefProductCategory>
  ) => void | Promise<any>;
};

export default function FilterCard(props: FilterCardProps) {
  const { onSearch } = props;

  const { data: principals } = useQuery({
    queryKey: ["principalsSelect"],
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
            <InputFormik<RefProductCategory> label="Name" name="name" />
            <SelectFormik<RefProductCategory, RefPrincipal>
              label="Principal"
              name="principalId"
              keyValue="id"
              keyLabel="name"
              option={principals}
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
