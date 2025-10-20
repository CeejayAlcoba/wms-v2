import type { RefPrincipal } from "../../@types/tables/RefPrincipal";
import type { RefProductCategory } from "../../@types/tables/RefProductCategory";
import { useQuery } from "@tanstack/react-query";
import { principalService } from "../../services/principalService";
import { useFormikContext } from "formik";
import SelectFormik, { type SelectFormikProps } from "../Formik/SelectFormik";
import { productCategoryService } from "../../services/productCategoryService";

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

  const { getFieldProps, setFieldValue } = useFormikContext<T>();

  const { data: principals } = useQuery({
    queryKey: ["principals"],
    queryFn: async () => await principalService.GetAll(),
    initialData: [],
  });

  const { data: productCategories } = useQuery({
    queryKey: ["productCategories", getFieldProps(principalName).value],
    queryFn: async () =>
      await productCategoryService.GetAll({
        principalId: getFieldProps(principalName).value,
      }),
    initialData: [],
  });

  const handleChangePrincipal = () => {
    setFieldValue(productCategoryName, null);
  };

  return (
    <>
      <SelectFormik<any, RefPrincipal>
        label="Principal"
        keyValue="id"
        keyLabel="name"
        option={principals}
        onChange={() => handleChangePrincipal()}
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
