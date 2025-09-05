import type { RefServiceField } from "../tables/RefServiceField";

export type ServiceFieldDTO = {
  date?: string | null;
  amount?: number| null;
  fields:RefServiceField[]
};
