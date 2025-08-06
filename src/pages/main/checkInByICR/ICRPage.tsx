import SelectFormik from "../../../components/Formik/SelectFormik";
import type { CheckInByICRDTO } from "../../../@types/DTOs/CheckInByICRDTO";
import type { RefCargoType } from "../../../@types/tables/RefCargoType";
import InputFormik from "../../../components/Formik/InputFormik";
import DatePickerFormik from "../../../components/Formik/DatePicker";
import { useQuery } from "@tanstack/react-query";
import { cargoTypeService } from "../../../services/cargoTypeService";
import type { RefTruckType } from "../../../@types/tables/RefTruckType";
import { truckTypeService } from "../../../services/truckTypeService";
import { useEffect } from "react";
import { principalService } from "../../../services/principalService";
import { useFormikContext } from "formik";
import PrincipalProductSelect from "../../../components/Select/PrincipalCategorySelect";

export default function ICRPage() {
  const { setFieldValue } = useFormikContext<CheckInByICRDTO>();
  const fieldName: keyof CheckInByICRDTO = "bookingDetails";

  const { data: cargoTypes } = useQuery({
    queryKey: ["cargoTypes"],
    queryFn: async () => {
      const res = await cargoTypeService.GetAll();
      setFieldValue(`${fieldName}.cargoTypeId`, res[0].id ?? null);
      return res;
    },
    initialData: [],
  });
  const { data: truckTypes } = useQuery({
    queryKey: ["truckTypes"],
    queryFn: async () => await truckTypeService.GetAll(),
    initialData: [],
  });

  return (
    <div className="row row-cols-lg-3">
      <DatePickerFormik<any>
        name={`${fieldName}.actualCheckInDate`}
        askterisk
        label="Actual check in"
      />
      <InputFormik<any>
        label="ICR Reference No"
        name={`${fieldName}.iCRReferenceNumber`}
        askterisk
      />
      <SelectFormik<any, RefCargoType>
        label="Cargo type"
        name={`${fieldName}.cargoTypeId`}
        allowClear={false}
        keyValue="id"
        keyLabel="name"
        option={cargoTypes}
        askterisk
      />
      <PrincipalProductSelect<CheckInByICRDTO>
        principalName={`${fieldName}.principalId`}
        productCategoryName={`${fieldName}.productCategoryId`}
      />
      <SelectFormik<any, RefTruckType>
        label="Truck Details"
        name={`${fieldName}.truckDetailsId`}
        keyValue="id"
        keyLabel="name"
        option={truckTypes}
      />
      <InputFormik<any> label="DR Number" name={`${fieldName}.drNumber`} />
    </div>
  );
}
