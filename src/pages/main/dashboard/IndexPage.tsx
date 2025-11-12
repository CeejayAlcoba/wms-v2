import { useState } from "react";
import RackDesigner from "../rackDesigner/RackDesigner";
import ShelfCargoInfoModal from "./modal/ShelfCargoInfoModal";
import type { ShelfDetails } from "../../../@types/tables/ShelfDetails";
import Summaries from "./SummaryCards";

export default function IndexPage() {
  const [shelfCargoInfoModal, setShelfCargoInfoModal] =
    useState<boolean>(false);
  const [selectedShelfDetails, setSelectedShelfDetails] =
    useState<ShelfDetails | null>(null);
  return (
    <div>
      <Summaries />
      <ShelfCargoInfoModal
        shelfDetails={selectedShelfDetails}
        open={shelfCargoInfoModal}
        onClose={() => {
          setShelfCargoInfoModal(false);
        }}
        onSubmit={() => {}}
      />

      <RackDesigner
        readonly
        onClickPallete={(shelf) => {
          setSelectedShelfDetails(shelf);
          setShelfCargoInfoModal(true);
        }}
      />
    </div>
  );
}
