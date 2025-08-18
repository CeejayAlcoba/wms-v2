import { Button, Card } from "antd";
import { Form, FormikProvider, useFormik, type FormikHelpers } from "formik";
import InputFormik from "../../../components/Formik/InputFormik";
import { SearchOutlined } from "@ant-design/icons";
import { EMPTY_FORM } from "./__constants__/EMPTY_FORM";
import type { ReportFilterDTO } from "../../../@types/DTOs/ReportFilterDTO";
import type { RefUnitOfMeasurement } from "../../../@types/tables/RefUnitOfMeasurement";
import DatePickerFormik from "../../../components/Formik/DatePicker";
import SelectFormik from "../../../components/Formik/SelectFormik";
import type { ShelfDetails } from "../../../@types/tables/ShelfDetails";
import { unitOfMeasurementService } from "../../../services/unitOfMeasurementService";
import { useQuery } from "@tanstack/react-query";
import PrincipalProductSelect from "../../../components/Select/PrincipalCategorySelect";
import type { GoodsReceipt } from "../../../@types/tables/GoodsReceipt";
import { goodsReceiptService } from "../../../services/goodsReceiptService";

export type FilterCardProps = {
  onSearch: (
    values: ReportFilterDTO,
    formikHelpers: FormikHelpers<ReportFilterDTO>
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
        <Form>
          <div className="row row-cols-lg-2">
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
            <InputFormik<ReportFilterDTO>
              label="Delivery Note"
              name="deliveryNote"
            />
            <SelectFormik<ReportFilterDTO, RefUnitOfMeasurement>
              label="Unit of Measurement"
              name="unitOfMeasurementId"
              keyValue="id"
              keyLabel="name"
              option={unitOfMeasurements}
            />
            <InputFormik<ReportFilterDTO> label="Batch No" name="batchNo" />
            <DatePickerFormik<ReportFilterDTO>
              label="Expiration Date"
              name="expirationDate"
            />
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
              type="primary"
              htmlType="submit"
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
