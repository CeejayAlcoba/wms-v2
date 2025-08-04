import type { RefProductCategory } from "../@types/tables/RefProductCategory";
import genericService from "./genericService";

const path = "product-category";

function _productCategoryService() {
  return { ...genericService<RefProductCategory>(path) };
}

export const productCategoryService = _productCategoryService();
