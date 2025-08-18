import type { Administrator } from "../tables/Administrator";
import type { RefRole } from "../tables/RefRole";

export type UserDTO = {
  roles?: RefRole[];
} & Administrator;
