import { Card } from "antd";
import { Form, FormikProvider, useFormik, type FormikHelpers } from "formik";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import type { PickListDetailsFilterDTO } from "../../../../@types/DTOs/PickListDetailsFilterDTO";
import InputFormik from "../../../../components/Formik/InputFormik";

export type FilterCardProps = {
  onSearch: (
    values: PickListDetailsFilterDTO,
    formikHelpers: FormikHelpers<PickListDetailsFilterDTO>
  ) => void | Promise<any>;
};

let typingTimer: NodeJS.Timeout;

export default function FilterCard(props: FilterCardProps) {
  const { onSearch } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  const formik = useFormik<PickListDetailsFilterDTO>({
    initialValues: EMPTY_FORM,
    enableReinitialize: true,
    onSubmit: onSearch,
  });

  useEffect(() => {
    const id = searchParams.get("id");
    if (id) formik.setFieldValue("id", id);
  }, []);

  const handleChange = (val: string) => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams);
      if (val == null) {
        newParams.delete("id");
      } else {
        newParams.set("id", val);
      }
      setSearchParams(newParams);
    }, 500);
  };

  return (
    <Card className="mb-2">
      <h6>Filters</h6>
      <FormikProvider value={formik}>
        <Form>
          <div className="row row-cols-lg-1">
            <InputFormik<PickListDetailsFilterDTO>
              label="Pick List No"
              name="id"
              prefix="PL-"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </Form>
      </FormikProvider>
    </Card>
  );
}
