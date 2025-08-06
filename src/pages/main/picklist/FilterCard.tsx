import { Button, Card } from "antd";
import { FormikProvider, useFormik, type FormikHelpers } from "formik";
import InputFormik from "../../../components/Formik/InputFormik";
import { SearchOutlined } from "@ant-design/icons";
import { EMPTY_FILTER } from "./__constants__/EMPTY_FILTER";
import type { InboundFilterDTO } from "../../../@types/DTOs/InboundFilterDTO";
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
    values: InboundFilterDTO,
    formikHelpers: FormikHelpers<InboundFilterDTO>
  ) => void | Promise<any>;
};

export default function FilterCard(props: FilterCardProps) {
  const { onSearch } = props;

  const formik = useFormik({
    initialValues: EMPTY_FILTER,
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
          <DatePickerFormik<InboundFilterDTO>
            label="Actual Check-in Date"
            name="actualCheckInDate"
          />

          <InputFormik<InboundFilterDTO>
            label="ICR Reference Number"
            name="icrReferenceNumber"
            askterisk
          />
          <PrincipalProductSelect
            principalName="principalId"
            productCategoryName="productCategoryId"
          />
          <SelectFormik<InboundFilterDTO, GoodsReceipt>
            label="Goods Receipt"
            name="goodsReceiptId"
            keyValue="id"
            keyLabel="name"
            option={goodsReceipts}
          />
          <InputFormik<InboundFilterDTO> label="SKU Code" name="skuCode" />
          <InputFormik<InboundFilterDTO> label="PRO Number" name="proNumber" />
          <InputFormik<InboundFilterDTO>
            label="Delivery Note"
            name="deliveryNote"
          />
          <SelectFormik<InboundFilterDTO, RefUnitOfMeasurement>
            label="Unit of Measurement"
            name="unitOfMeasurementId"
            keyValue="id"
            keyLabel="name"
            option={unitOfMeasurements}
          />
          <InputFormik<InboundFilterDTO> label="Batch No" name="batchNo" />
          <DatePickerFormik<InboundFilterDTO>
            label="Expiration Date"
            name="expirationDate"
          />
          <SelectFormik<InboundFilterDTO, ShelfDetails>
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
