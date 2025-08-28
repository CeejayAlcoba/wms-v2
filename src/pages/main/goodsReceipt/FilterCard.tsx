import { Button, Card } from "antd";
import { Form, FormikProvider, useFormik, type FormikHelpers } from "formik";
import type { BookingDetails } from "../../../@types/tables/BookingDetails";
import { SearchOutlined } from "@ant-design/icons";
import SelectFormik from "../../../components/Formik/SelectFormik";
import { useQuery } from "@tanstack/react-query";
import { EMPTY_BOOKING_DETAILS } from "./__constants__/EMPTY_BOOKING_DETAILS";
import DatePickerFormik from "../../../components/Formik/DatePicker";
import PrincipalProductSelect from "../../../components/Select/PrincipalCategorySelect";
import type { RefCargoType } from "../../../@types/tables/RefCargoType";
import { cargoTypeService } from "../../../services/cargoTypeService";
import type { RefPalleteGroup } from "../../../@types/tables/RefPalleteGroup";
import type { RefTruckDetails } from "../../../@types/tables/RefTruckDetails";
import { truckDetailsService } from "../../../services/truckDetailsService";
import InputFormik from "../../../components/Formik/InputFormik";
import type { TabKey } from "./IndexPage";
import { goodsReceiptService } from "../../../services/goodsReceiptService";
import type { GoodsReceipt } from "../../../@types/tables/GoodsReceipt";

export type FilterCardProps = {
  onSearch: (
    values: BookingDetails,
    formikHelpers: FormikHelpers<BookingDetails>
  ) => void | Promise<any>;
  activeKey: TabKey;
};

export default function FilterCard(props: FilterCardProps) {
  const { onSearch, activeKey } = props;

  const { data: cargoTypes } = useQuery({
    queryKey: ["cargoTypes"],
    queryFn: async () => await cargoTypeService.GetAll(),
    initialData: [],
  });
  const { data: truckDetails } = useQuery({
    queryKey: ["truckDetails"],
    queryFn: async () => await truckDetailsService.GetAll(),
    initialData: [],
  });
  const { data: goodsReceipts } = useQuery({
    queryKey: ["goodsReceipts"],
    queryFn: async () => await goodsReceiptService.GetAll(),
    initialData: [],
  });

  const formik = useFormik({
    initialValues: EMPTY_BOOKING_DETAILS,
    enableReinitialize: true,
    onSubmit: onSearch,
  });

  return (
    <Card className="mb-2">
      <h6>Filters</h6>
      <FormikProvider value={formik}>
        <Form>
          <div className="row row-cols-lg-2">
            <DatePickerFormik<BookingDetails>
              label="Actual Check In Date"
              name="actualCheckInDate"
            />
            <PrincipalProductSelect<BookingDetails>
              principalProps={{
                name: "principalId",
              }}
              productCategoryProps={{
                name: "productCategoryId",
              }}
            />
            <SelectFormik<BookingDetails, RefCargoType>
              label="Cargo Type"
              name="cargoTypeId"
              keyValue="id"
              keyLabel="name"
              option={cargoTypes}
            />
            <InputFormik<BookingDetails> label="DR No" name="drNumber" />
            <InputFormik<BookingDetails>
              label="ICR No"
              name="icrReferenceNumber"
            />
            <SelectFormik<BookingDetails, RefPalleteGroup>
              label="Pallete Group"
              name="palleteGroupId"
              keyValue="id"
              keyLabel="name"
              option={[]}
            />
            <SelectFormik<BookingDetails, RefTruckDetails>
              label="Truck Plate Number"
              name="truckDetailsId"
              keyValue="id"
              keyLabel="plateNumber"
              option={truckDetails}
            />
            {activeKey == "Completed" && (
              <SelectFormik<BookingDetails, GoodsReceipt>
                label="Good Receipt"
                name="goodsReceiptId"
                keyValue="id"
                keyLabel="name"
                option={goodsReceipts}
              />
            )}
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
