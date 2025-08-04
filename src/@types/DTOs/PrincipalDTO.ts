import type { RefPrincipal } from "../tables/RefPrincipal";
import type { RefProductCategory } from "../tables/RefProductCategory";

export type PrincipalDTO = {
  productCategories: RefProductCategory[];
} & RefPrincipal;
