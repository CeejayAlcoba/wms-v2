import { Button, Card } from "antd";
import { Form, FormikProvider, useFormik, type FormikHelpers } from "formik";

import { SearchOutlined } from "@ant-design/icons";

import { useQuery } from "@tanstack/react-query";
import type { ReportFilterDTO } from "../../../../@types/DTOs/ReportFilterDTO";
import { EMPTY_FILTER } from "../__constants__/EMPTY_FILTER";
import { goodsReceiptService } from "../../../../services/goodsReceiptService";
import DatePickerFormik from "../../../../components/Formik/DatePicker";
import InputFormik from "../../../../components/Formik/InputFormik";
import PrincipalProductSelect from "../../../../components/Select/PrincipalCategorySelect";
import SelectFormik from "../../../../components/Formik/SelectFormik";
import type { GoodsReceipt } from "../../../../@types/tables/GoodsReceipt";
import type { ShelfDetails } from "../../../../@types/tables/ShelfDetails";

export type FilterCardProps = {
  onSearch: (
    values: ReportFilterDTO,
    formikHelpers: FormikHelpers<ReportFilterDTO>
  ) => void | Promise<any>;
};

export default function FilterCard(props: FilterCardProps) {
  const { onSearch } = props;

  const formik = useFormik({
    initialValues: EMPTY_FILTER,
    enableReinitialize: true,
    onSubmit: onSearch,
  });

  const { data: goodsReceipts } = useQuery({
    queryKey: ["goodsReceipts"],
    queryFn: async () => await goodsReceiptService.GetAll(),
    initialData: [],
  });

  return (
    <Card className="mb-2">
      <h6>Filters</h6>
      <FormikProvider value={formik}>
        <Form>
          <div className="row row-cols-lg-4">
            <DatePickerFormik<ReportFilterDTO>
              label="Actual Check-in Date"
              name="actualCheckInDate"
            />

            <InputFormik<ReportFilterDTO>
              label="ICR Reference Number"
              name="icrReferenceNumber"
              askterisk
            />
            <PrincipalProductSelect
              principalName="principalId"
              productCategoryName="productCategoryId"
            />
            <SelectFormik<ReportFilterDTO, GoodsReceipt>
              label="Goods Receipt"
              name="goodsReceiptId"
              keyValue="id"
              keyLabel="name"
              option={goodsReceipts}
            />
            <InputFormik<ReportFilterDTO> label="SKU Code" name="skuCode" />
            <InputFormik<ReportFilterDTO> label="PRO Number" name="proNumber" />
            <InputFormik<ReportFilterDTO> label="Batch No" name="batchNo" />
            <SelectFormik<ReportFilterDTO, ShelfDetails>
              label="Bin Location"
              name="shelfDetailsId"
              keyValue="id"
              keyLabel="name"
              option={[]}
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
