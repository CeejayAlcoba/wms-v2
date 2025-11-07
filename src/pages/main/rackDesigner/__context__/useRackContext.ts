import { createContext, useContext } from "react";
import type { RackDetailsDTO } from "../../../../@types/DTOs/RackDetailsDTO";
import type { BayDetailsGetDTO } from "../../../../@types/DTOs/BayDetailsGetDTO";
import type { RackDetails } from "../../../../@types/tables/RackDetails";

type RackContextType = {
  readonly: boolean;
  rackSaveModal: boolean;
  setRackSaveModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRack: RackDetailsDTO | null;
  setSelectedRack: React.Dispatch<React.SetStateAction<RackDetailsDTO | null>>;
  selectedBay: BayDetailsGetDTO | null;
  setSelectedBay: React.Dispatch<React.SetStateAction<BayDetailsGetDTO | null>>;
  levelSaveModal: boolean;
  setLevelSaveModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const RackContext = createContext<RackContextType | null>(null);

export default function useRackContext() {
  const context = useContext(RackContext);
  if (!context) throw new Error("RackContext is null");

  return context;
}
