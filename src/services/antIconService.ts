import type { MasterAntIcon } from "../@types/tables/MasterAntIcon";
import genericService from "./genericService";

const path = "master-ant-icon";

function _antIconService() {
  return { ...genericService<MasterAntIcon>(path) };
}

export const antIconService = _antIconService();
