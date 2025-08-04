import SelectFormik from "../../../components/Formik/SelectFormik";
import type { CheckInByICRDTO } from "../../../@types/DTOs/CheckInByICRDTO";
import type { RefCargoType } from "../../../@types/tables/RefCargoType";
import InputFormik from "../../../components/Formik/InputFormik";
import DatePickerFormik from "../../../components/Formik/DatePicker";
import { useQuery } from "@tanstack/react-query";
import { cargoTypeService } from "../../../services/cargoTypeService";
import type { RefPrincipal } from "../../../@types/tables/RefPrincipal";
import type { RefProductCategory } from "../../../@types/tables/RefProductCategory";
import type { RefTruckType } from "../../../@types/tables/RefTruckType";
import { truckTypeService } from "../../../services/truckTypeService";
import { useEffect, useState } from "react";
import { principalService } from "../../../services/principalService";
import { productCategoryService } from "../../../services/productCategoryService";
import { useFormikContext } from "formik";

export default function ICRPage() {
  const [productCategories, setProductCategories] = useState<
    RefProductCategory[]
  >([]);
  const { setFieldValue, getFieldProps } = useFormikContext<CheckInByICRDTO>();
  const fieldName: keyof CheckInByICRDTO = "bookingDetails";

  const { data: principals } = useQuery({
    queryKey: ["principals"],
    queryFn: async () => await principalService.GetAll(),
    initialData: [],
  });
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

  useEffect(() => {
    const principalId = getFieldProps(`${fieldName}.principalId`).value;
    const prods =
      principals.find((p) => p.id == principalId)?.productCategories ?? [];
    setProductCategories(prods);
  }, [getFieldProps(`${fieldName}.principalId`).value]);

  const handleChangePrincipal = (principalId: number) => {
    if (!principalId) {
      setProductCategories([]);
      setFieldValue(`${fieldName}.productCategoryId`, null);
      return;
    }

    const prods =
      principals.find((p) => p.id == principalId)?.productCategories ?? [];
    setProductCategories(prods);
  };

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
      <SelectFormik<any, RefPrincipal>
        label="Principal"
        name={`${fieldName}.principalId`}
        keyValue="id"
        keyLabel="name"
        option={principals}
        onChange={(val) => handleChangePrincipal(val)}
        askterisk
      />
      <SelectFormik<any, RefProductCategory>
        label="Product Category"
        name={`${fieldName}.productCategoryId`}
        keyValue="id"
        keyLabel="name"
        option={productCategories}
        askterisk
      
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
