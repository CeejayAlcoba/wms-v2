import { useEffect, useState } from "react";
import type { RefPrincipal } from "../../@types/tables/RefPrincipal";
import type { RefProductCategory } from "../../@types/tables/RefProductCategory";
import { useQuery } from "@tanstack/react-query";
import { principalService } from "../../services/principalService";
import { useFormikContext } from "formik";
import SelectFormik from "../Formik/SelectFormik";

export type PrincipalProductSelectProps = {
  principalName: string;
  productCategoryName: string;
};

export default function PrincipalProductSelect<TFormik>(
  props: PrincipalProductSelectProps
) {
  const { principalName, productCategoryName } = props;
  const [productCategories, setProductCategories] = useState<
    RefProductCategory[]
  >([]);

  const { getFieldProps, setFieldValue } = useFormikContext<TFormik>();

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
  }, [getFieldProps(principalName).value]);

  const handleChangePrincipal = (principalId: number) => {
    if (!principalId) {
      setProductCategories([]);
      setFieldValue(productCategoryName, null);
      return;
    }
  };

  return (
    <>
      <SelectFormik<any, RefPrincipal>
        name={principalName}
        label="Principal"
        keyValue="id"
        keyLabel="name"
        option={principals}
        onChange={(val) => handleChangePrincipal(val)}
        askterisk
      />
      <SelectFormik<any, RefProductCategory>
        name={productCategoryName}
        label="Product Category"
        keyValue="id"
        keyLabel="name"
        option={productCategories}
        askterisk
      />
    </>
  );
}
