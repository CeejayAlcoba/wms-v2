import { Button, Card } from "antd";
import { Form, FormikProvider, useFormik, type FormikHelpers } from "formik";
import InputFormik from "../../../components/Formik/InputFormik";
import type { RefTruckDetails } from "../../../@types/tables/RefTruckDetails";
import { SearchOutlined } from "@ant-design/icons";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import SelectFormik from "../../../components/Formik/SelectFormik";
import type { RefTruckType } from "../../../@types/tables/RefTruckType";
import { useQuery } from "@tanstack/react-query";
import { truckTypeService } from "../../../services/truckTypeService";

export type FilterCardProps = {
  onSearch: (
    values: RefTruckDetails,
    formikHelpers: FormikHelpers<RefTruckDetails>
  ) => void | Promise<any>;
};

export default function FilterCard(props: FilterCardProps) {
  const { onSearch } = props;

  const { data: truckTypes } = useQuery({
    queryKey: ["truckTypes"],
    queryFn: async () => await truckTypeService.GetAll(),
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
            <InputFormik<RefTruckDetails>
              label="Plate Number"
              name="plateNumber"
            />
            <InputFormik<RefTruckDetails>
              label="Driver Name"
              name="driverName"
            />
            <SelectFormik<RefTruckDetails, RefTruckType>
              label="Truck type"
              name="truckTypeId"
              keyValue="id"
              keyLabel="name"
              option={truckTypes}
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
