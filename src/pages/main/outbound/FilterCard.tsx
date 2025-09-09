import { Button, Card } from "antd";
import { FormikProvider, useFormik, type FormikHelpers } from "formik";
import InputFormik from "../../../components/Formik/InputFormik";
import { SearchOutlined } from "@ant-design/icons";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import type { ReportOutboundFilterDTO } from "../../../@types/DTOs/ReportOutboundFilterDTO";
import type { RefUnitOfMeasurement } from "../../../@types/tables/RefUnitOfMeasurement";
import DatePickerFormik from "../../../components/Formik/DatePicker";
import SelectFormik from "../../../components/Formik/SelectFormik";
import { unitOfMeasurementService } from "../../../services/unitOfMeasurementService";
import { useQuery } from "@tanstack/react-query";
import PrincipalProductSelect from "../../../components/Select/PrincipalCategorySelect";
import type { GoodsReceipt } from "../../../@types/tables/GoodsReceipt";
import { goodsReceiptService } from "../../../services/goodsReceiptService";
import DateRangePickerFormik from "../../../components/Formik/DateRangePickerFormik";

export type FilterCardProps = {
  onSearch: (
    values: ReportOutboundFilterDTO,
    formikHelpers: FormikHelpers<ReportOutboundFilterDTO>
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
          <DateRangePickerFormik<ReportOutboundFilterDTO>
            dateFromProps={{
              label: "Pull Out Date",
              name: "pullOutDateFrom",
            }}
            dateToProps={{
              label: "To",
              name: "pullOutDateTo",
            }}
          />
          <DatePickerFormik<ReportOutboundFilterDTO>
            label="Actual Check In"
            name="actualCheckInDate"
          />
          <InputFormik<ReportOutboundFilterDTO>
            prefix={"PL-"}
            label="Pick List No"
            name="pickListDetailsId"
          />
          <InputFormik<ReportOutboundFilterDTO>
            prefix={"GI-"}
            label="Good Issue"
            name="goodIssueId"
          />
          <InputFormik<ReportOutboundFilterDTO> label="OCR" name="ocrNumber" />
          <InputFormik<ReportOutboundFilterDTO>
            label="ICR Reference Number"
            name="icrReferenceNumber"
          />
          <PrincipalProductSelect<ReportOutboundFilterDTO>
            principalProps={{
              name: "principalId",
            }}
            productCategoryProps={{
              name: "productCategoryId",
            }}
          />
          <SelectFormik<ReportOutboundFilterDTO, GoodsReceipt>
            label="Goods Receipt"
            name="goodsReceiptId"
            keyValue="id"
            keyLabel="name"
            option={goodsReceipts}
          />
          <InputFormik<ReportOutboundFilterDTO>
            label="SKU Code"
            name="skuCode"
          />
          <InputFormik<ReportOutboundFilterDTO>
            label="PRO Number"
            name="proNumber"
          />
          <SelectFormik<ReportOutboundFilterDTO, RefUnitOfMeasurement>
            label="Unit of Measurement"
            name="unitOfMeasurementId"
            keyValue="id"
            keyLabel="name"
            option={unitOfMeasurements}
          />
          <InputFormik<ReportOutboundFilterDTO>
            label="Batch No"
            name="batchNo"
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
