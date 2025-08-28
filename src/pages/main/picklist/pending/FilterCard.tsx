import { Button, Card } from "antd";
import { Form, FormikProvider, useFormik, type FormikHelpers } from "formik";

import { SearchOutlined } from "@ant-design/icons";

import { useQuery } from "@tanstack/react-query";
import type { ReportPickListFilterDTO } from "../../../../@types/DTOs/ReportPickListFilterDTO";
import { EMPTY_FILTER } from "../__constants__/EMPTY_FILTER";
import { goodsReceiptService } from "../../../../services/goodsReceiptService";
import DatePickerFormik from "../../../../components/Formik/DatePicker";
import InputFormik from "../../../../components/Formik/InputFormik";
import PrincipalProductSelect from "../../../../components/Select/PrincipalCategorySelect";
import SelectFormik from "../../../../components/Formik/SelectFormik";
import type { GoodsReceipt } from "../../../../@types/tables/GoodsReceipt";
import type { ShelfDetails } from "../../../../@types/tables/ShelfDetails";
import DateRangePickerFormik from "../../../../components/Formik/DateRangePickerFormik";
import SwitchFormik from "../../../../components/Formik/SwitchFormik";

export type FilterCardProps = {
  onSearch: (
    values: ReportPickListFilterDTO,
    formikHelpers: FormikHelpers<ReportPickListFilterDTO>
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
        <div className="row row-cols-lg-3">
          <DateRangePickerFormik<ReportPickListFilterDTO>
            dateFromProps={{
              label: "Actual Check-in Date",
              name: "actualCheckInDateFrom",
            }}
            dateToProps={{
              name: "actualCheckInDateTo",
            }}
          />
          <InputFormik<ReportPickListFilterDTO>
            label="ICR Reference Number"
            name="icrReferenceNumber"
            askterisk
          />
          <PrincipalProductSelect<ReportPickListFilterDTO>
            principalProps={{
              name: "principalId",
            }}
            productCategoryProps={{
              name: "productCategoryId",
            }}
          />
          <SelectFormik<ReportPickListFilterDTO, GoodsReceipt>
            label="Goods Receipt"
            name="goodsReceiptId"
            keyValue="id"
            keyLabel="name"
            option={goodsReceipts}
          />
          <InputFormik<ReportPickListFilterDTO>
            label="SKU Code"
            name="skuCode"
          />
          <InputFormik<ReportPickListFilterDTO>
            label="PRO Number"
            name="proNumber"
          />
          <InputFormik<ReportPickListFilterDTO>
            label="Batch No"
            name="batchNo"
          />
          <SelectFormik<ReportPickListFilterDTO, ShelfDetails>
            label="Bin Location"
            name="shelfDetailsId"
            keyValue="id"
            keyLabel="name"
            option={[]}
          />
          <SwitchFormik<ReportPickListFilterDTO>
            label="Show Zero Balances"
            name="allowZeroBalance"
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
