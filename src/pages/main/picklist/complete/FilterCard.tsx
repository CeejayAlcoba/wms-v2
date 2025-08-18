import { Button, Card } from "antd";
import { Form, FormikProvider, useFormik, type FormikHelpers } from "formik";

import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";

import { useQuery } from "@tanstack/react-query";

import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import type { PickListDetails } from "../../../../@types/tables/PickListDetails";
import type { PickListDetailsRecordFilterDTO } from "../../../../@types/DTOs/PickListDetailsRecordFilterDTO";
import { pickListDetailsService } from "../../../../services/pickListDetailsService";
import SelectFormik from "../../../../components/Formik/SelectFormik";

export type FilterCardProps = {
  onSearch: (
    values: PickListDetails,
    formikHelpers: FormikHelpers<PickListDetailsRecordFilterDTO>
  ) => void | Promise<any>;
};

export default function FilterCard(props: FilterCardProps) {
  const { onSearch } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  const formik = useFormik<PickListDetails>({
    initialValues: EMPTY_FORM,
    enableReinitialize: true,
    onSubmit: onSearch,
  });

  const { data: pickListDetails } = useQuery({
    queryKey: ["pickListDetails"],
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
            <SelectFormik<PickListDetails, any>
              label="Pick List No"
              name="id"
              keyValue="id"
              keyLabel="name"
              option={pickListDetails}
              onChange={handleChange}
            />
          </div>
        </Form>
      </FormikProvider>
    </Card>
  );
}
