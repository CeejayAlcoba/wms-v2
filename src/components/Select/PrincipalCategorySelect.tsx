import { useEffect, useState } from "react";
import type { RefPrincipal } from "../../@types/tables/RefPrincipal";
import type { RefProductCategory } from "../../@types/tables/RefProductCategory";
import { useQuery } from "@tanstack/react-query";
import { principalService } from "../../services/principalService";
import { useFormikContext } from "formik";
import SelectFormik, { type SelectFormikProps } from "../Formik/SelectFormik";

export type PrincipalProductSelectProps<T = any> = {
  principalProps: Omit<
    SelectFormikProps<T, RefPrincipal>,
    "keyValue" | "keyLabel" | "option"
  >;
  productCategoryProps: Omit<
    SelectFormikProps<T, RefProductCategory>,
    "keyValue" | "keyLabel" | "option"
  >;
};

export default function PrincipalProductSelect<T = any>(
  props: PrincipalProductSelectProps<T>
) {
  const { principalProps, productCategoryProps } = props;
  const principalName = principalProps.name;
  const productCategoryName = productCategoryProps.name;

  const [productCategories, setProductCategories] = useState<
    RefProductCategory[]
  >([]);

  const { getFieldProps, setFieldValue } = useFormikContext<T>();

  const { data: principals } = useQuery({
    queryKey: ["principals"],
    queryFn: async () => await principalService.GetAll(),
    initialData: [],
  });

  useEffect(() => {
    const principalId = getFieldProps(principalName).value;
    const prods =
      principals.find((p) => p.id == principalId)?.productCategories ?? [];
    setProductCategories(prods);
  }, [getFieldProps(principalName as string).value]);

  const handleChangePrincipal = (principalId: number) => {
    setFieldValue(productCategoryName, null);
    if (!principalId) {
      setProductCategories([]);
      return;
    }
  };

  return (
    <>
      <SelectFormik<any, RefPrincipal>
        label="Principal"
        keyValue="id"
        keyLabel="name"
        option={principals}
        onChange={(val) => handleChangePrincipal(val)}
        {...principalProps}
      />
      <SelectFormik<any, RefProductCategory>
        label="Product Category"
        keyValue="id"
        keyLabel="name"
        option={productCategories}
        {...productCategoryProps}
      />
    </>
  );
}
