import { Button, Card } from "antd";
import { Form, FormikProvider, useFormik, type FormikHelpers } from "formik";
import InputFormik from "../../../components/Formik/InputFormik";
import type { Administrator } from "../../../@types/tables/Administrator";
import { SearchOutlined } from "@ant-design/icons";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import type { UserDTO } from "../../../@types/DTOs/UserDTO";

export type FilterCardProps = {
  onSearch: (
    values: UserDTO,
    formikHelpers: FormikHelpers<UserDTO>
  ) => void | Promise<any>;
};

export default function FilterCard(props: FilterCardProps) {
  const { onSearch } = props;

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
            <InputFormik<Administrator> label="User Name" name="username" />
            <InputFormik<Administrator> label="Last Name" name="lastName" />
            <InputFormik<Administrator> label="First Name" name="firstName" />
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
