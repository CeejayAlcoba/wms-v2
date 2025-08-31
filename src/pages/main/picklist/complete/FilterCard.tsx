import { Card } from "antd";
import { Form, FormikProvider, useFormik, type FormikHelpers } from "formik";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import SelectFormik from "../../../../components/Formik/SelectFormik";
import type { PickListDetailsFilterDTO } from "../../../../@types/DTOs/PickListDetailsFilterDTO";
import { pickListDetailsService } from "../../../../services/pickListDetailsService";

export type FilterCardProps = {
  onSearch: (
    values: PickListDetailsFilterDTO,
    formikHelpers: FormikHelpers<PickListDetailsFilterDTO>
  ) => void | Promise<any>;
};

export default function FilterCard(props: FilterCardProps) {
  const { onSearch } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  const formik = useFormik<PickListDetailsFilterDTO>({
    initialValues: EMPTY_FORM,
    enableReinitialize: true,
    onSubmit: onSearch,
  });

  const { data: PickListDetailsFilterDTO } = useQuery({
    queryKey: ["PickListDetailsFilterDTO"],
    queryFn: async () => {
      const res = await pickListDetailsService.GetAll();
      return res?.map((r) => ({ ...r, name: `PL-${r.id}` })) ?? [];
    },
    initialData: [],
  });

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) formik.setFieldValue("id", id);
  }, []);

  const handleChange = (val: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (val == null) {
      newParams.delete("id");
    } else {
      newParams.set("id", val);
    }
    setSearchParams(newParams);
  };

  return (
    <Card className="mb-2">
      <h6>Filters</h6>
      <FormikProvider value={formik}>
        <Form>
          <div className="row row-cols-lg-1">
            <SelectFormik<PickListDetailsFilterDTO, any>
              label="Pick List No"
              name="id"
              keyValue="id"
              keyLabel="name"
              option={PickListDetailsFilterDTO}
              onChange={handleChange}
            />
          </div>
        </Form>
      </FormikProvider>
    </Card>
  );
}
