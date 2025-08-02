import type { RefPrincipal } from "../@types/tables/RefPrincipal";
import genericService from "./genericService";

const path = "principal";

function _principalService() {
  return { ...genericService<RefPrincipal>(path) };
}

export const principalService = _principalService();
