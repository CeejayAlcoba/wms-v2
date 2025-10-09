import { Button, Card } from "antd";
import { Form, FormikProvider, useFormik, type FormikHelpers } from "formik";
import InputFormik from "../../../components/Formik/InputFormik";
import { SearchOutlined } from "@ant-design/icons";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import SelectFormik from "../../../components/Formik/SelectFormik";
import { ACTION_TYPES, type ActionType } from "./__constants__/ACTION_TYPE";
import { useQuery } from "@tanstack/react-query";
import { userService } from "../../../services/userService";
import type { UserDTO } from "../../../@types/DTOs/UserDTO";
import type { AuditLogsFilterDTO } from "../../../@types/DTOs/AuditLogsFilterDTO";
import DateRangePickerFormik from "../../../components/Formik/DateRangePickerFormik";

export type FilterCardProps = {
  onSearch: (
    values: AuditLogsFilterDTO,
    formikHelpers: FormikHelpers<AuditLogsFilterDTO>
  ) => void | Promise<any>;
};

export default function FilterCard(props: FilterCardProps) {
  const { onSearch } = props;

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => await userService.GetAll(),
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
            <DateRangePickerFormik<AuditLogsFilterDTO>
              dateFromProps={{ name: "dateFrom", label: "Date From" }}
              dateToProps={{ name: "dateTo", label: "Date From" }}
            />
            <InputFormik<AuditLogsFilterDTO> label="Module" name="pageName" />
            <SelectFormik<AuditLogsFilterDTO, ActionType>
              label="Action Type"
              name="actionType"
              option={ACTION_TYPES}
              keyLabel="label"
              keyValue="value"
            />
            <SelectFormik<AuditLogsFilterDTO, UserDTO>
              label="Audit By"
              name="auditBy"
              option={users.map((u) => ({
                ...u,
                firstName: `${u.lastName}, ${u.firstName}`,
              }))}
              keyLabel="firstName"
              keyValue="id"
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
