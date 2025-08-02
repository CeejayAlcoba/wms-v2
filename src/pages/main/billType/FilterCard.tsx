import { Button, Card } from "antd";
import { FormikProvider, useFormik, type FormikHelpers } from "formik";
import InputFormik from "../../../components/Formik/InputFormik";
import type { MasterBillType } from "../../../@types/tables/MasterBillType";
import { SearchOutlined } from "@ant-design/icons";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";

export type FilterCardProps = {
  onSearch: (
    values: MasterBillType,
    formikHelpers: FormikHelpers<MasterBillType>
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
        <div className="row row-cols-lg-2">
          <InputFormik<MasterBillType> label="Name" name="name" />
        </div>
        <div className="d-flex justify-content-end">
          <Button
            type="primary"
            onClick={() => formik.submitForm()}
            icon={<SearchOutlined />}
          >
            Search
          </Button>
        </div>
      </FormikProvider>
    </Card>
  );
}
