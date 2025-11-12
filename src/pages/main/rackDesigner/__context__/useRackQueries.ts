import { createContext, useContext } from "react";
import type { RackDetails } from "../../../../@types/tables/RackDetails";
import type { DefinedUseQueryResult } from "@tanstack/react-query";
import type { BayDetails } from "../../../../@types/tables/BayDetails";
import type { ShelfDetails } from "../../../../@types/tables/ShelfDetails";

type RackQueryType = {
  rackQuery: DefinedUseQueryResult<RackDetails[], Error>;
  bayQuery: DefinedUseQueryResult<BayDetails[], Error>;
  shelfQuery: DefinedUseQueryResult<ShelfDetails[], Error>;
};

export const RackQueries = createContext<RackQueryType | null>(null);

export default function useRackQueries() {
  const context = useContext(RackQueries);
  if (!context) throw new Error("RackContext is null");

  return context;
}
