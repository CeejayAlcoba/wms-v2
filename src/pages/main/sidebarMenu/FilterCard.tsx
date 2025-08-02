import { Button, Card } from "antd";
import { FormikProvider, useFormik, type FormikHelpers } from "formik";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import InputFormik from "../../../components/Formik/InputFormik";
import type { MasterSidebarMenu } from "../../../@types/tables/MasterSidebarMenu";
import SelectFormik from "../../../components/Formik/SelectFormik";
import { antIconService } from "../../../services/antIconService";
import AntIcon from "../../../components/AntIcon/AntIcon";
import { useQuery } from "@tanstack/react-query";
import { SearchOutlined } from "@ant-design/icons";

export type FilterCardProps = {
  onSearch: (
    values: MasterSidebarMenu,
    formikHelpers: FormikHelpers<MasterSidebarMenu>
  ) => void | Promise<any>;
};

export default function FilterCard(props: FilterCardProps) {
  const { onSearch } = props;
  const { data: antIcons } = useQuery({
    queryKey: ["antIcons"],
    queryFn: async () => {
      const res = await antIconService.GetAll();
      const result = res?.map((r) => ({
        value: r.id,
        label: (
          <span>
            <AntIcon icon={r.name || ""} /> {r.name}
          </span>
        ),
      }));
      return result;
    },
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
        <div className="row row-cols-lg-2">
          <InputFormik<MasterSidebarMenu>
            label="Name"
            askterisk
            name="name"
            className="col-sm"
          />
          <SelectFormik<MasterSidebarMenu, any>
            label="Icon"
            askterisk
            name="antIconId"
            keyValue="value"
            keyLabel="label"
            className="col-sm"
            option={antIcons}
          />
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
