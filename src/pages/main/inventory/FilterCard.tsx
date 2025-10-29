import { Button, Card } from "antd";
import { FormikProvider, useFormik, type FormikHelpers } from "formik";
import InputFormik from "../../../components/Formik/InputFormik";
import { SearchOutlined } from "@ant-design/icons";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import type { ReportInventoryFilterDTO } from "../../../@types/DTOs/ReportInventoryFilterDTO";
import type { RefUnitOfMeasurement } from "../../../@types/tables/RefUnitOfMeasurement";
import DatePickerFormik from "../../../components/Formik/DatePicker";
import SelectFormik from "../../../components/Formik/SelectFormik";
import type { ShelfDetails } from "../../../@types/tables/ShelfDetails";
import { unitOfMeasurementService } from "../../../services/unitOfMeasurementService";
import { useQuery } from "@tanstack/react-query";
import PrincipalProductSelect from "../../../components/Select/PrincipalCategorySelect";
import type { GoodsReceipt } from "../../../@types/tables/GoodsReceipt";
import { goodsReceiptService } from "../../../services/goodsReceiptService";
import DateRangePickerFormik from "../../../components/Formik/DateRangePickerFormik";
import SwitchFormik from "../../../components/Formik/SwitchFormik";
import { shelfDetailsService } from "../../../services/shelfDetailsService";

export type FilterCardProps = {
  onSearch: (
    values: ReportInventoryFilterDTO,
    formikHelpers: FormikHelpers<ReportInventoryFilterDTO>
  ) => void | Promise<any>;
};

export default function FilterCard(props: FilterCardProps) {
  const { onSearch } = props;

  const formik = useFormik({
    initialValues: EMPTY_FORM,
    enableReinitialize: true,
    onSubmit: onSearch,
  });

  const { data: unitOfMeasurements } = useQuery({
    queryKey: ["unitOfMeasurements"],
    queryFn: async () => await unitOfMeasurementService.GetAll(),
    initialData: [],
  });

  const { data: shelfDetails } = useQuery({
    queryKey: ["shelfDetails"],
    queryFn: async () => await shelfDetailsService.GetAll(),
    initialData: [],
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
        <div className="row row-cols-lg-2">
          <DateRangePickerFormik<ReportInventoryFilterDTO>
            dateFromProps={{
              label: "Actual Check-in Date",
              name: "actualCheckInDateFrom",
            }}
            dateToProps={{
              name: "actualCheckInDateTo",
            }}
          />

          <InputFormik<ReportInventoryFilterDTO>
            label="ICR Reference Number"
            name="icrReferenceNumber"
            askterisk
          />
          <PrincipalProductSelect<ReportInventoryFilterDTO>
            principalProps={{
              name: "principalId",
            }}
            productCategoryProps={{
              name: "productCategoryId",
            }}
          />
          <SelectFormik<ReportInventoryFilterDTO, GoodsReceipt>
            label="Goods Receipt"
            name="goodsReceiptId"
            keyValue="id"
            keyLabel="name"
            option={goodsReceipts}
          />
          <InputFormik<ReportInventoryFilterDTO>
            label="SKU Code"
            name="skuCode"
          />
          <InputFormik<ReportInventoryFilterDTO>
            label="PRO Number"
            name="proNumber"
          />
          <InputFormik<ReportInventoryFilterDTO>
            label="Delivery Note"
            name="deliveryNote"
          />
          <SelectFormik<ReportInventoryFilterDTO, RefUnitOfMeasurement>
            label="Unit of Measurement"
            name="unitOfMeasurementId"
            keyValue="id"
            keyLabel="name"
            option={unitOfMeasurements}
          />
          <InputFormik<ReportInventoryFilterDTO>
            label="Batch No"
            name="batchNo"
          />
          <DatePickerFormik<ReportInventoryFilterDTO>
            label="Expiration Date"
            name="expirationDate"
          />
          <SelectFormik<ReportInventoryFilterDTO, ShelfDetails>
            label="Bin Location"
            name="shelfDetailsId"
            keyValue="id"
            keyLabel="name"
            option={shelfDetails}
          />
          <SwitchFormik<ReportInventoryFilterDTO>
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
