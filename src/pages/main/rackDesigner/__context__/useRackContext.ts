import { createContext, useContext } from "react";
import type { RackDetailsDTO } from "../../../../@types/DTOs/RackDetailsDTO";
import type { BayDetailsGetDTO } from "../../../../@types/DTOs/BayDetailsGetDTO";
import type {
  QueryObserverResult,
  RefetchOptions,
} from "@tanstack/react-query";

type RackContextType = {
  rackSaveModal: boolean;
  setRackSaveModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRack: RackDetailsDTO | null;
  setSelectedRack: React.Dispatch<React.SetStateAction<RackDetailsDTO | null>>;
  selectedBay: BayDetailsGetDTO | null;
  setSelectedBay: React.Dispatch<React.SetStateAction<BayDetailsGetDTO | null>>;
  levelSaveModal: boolean;
  setLevelSaveModal: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<RackDetailsDTO[], Error>>;
};

export const RackContext = createContext<RackContextType | null>(null);

export default function useRackContext() {
  const context = useContext(RackContext);
  if (!context) throw new Error("RackContext is null");

  return context;
}
