import Pallete from "./Pallete";
import type { BayDetailsGetDTO } from "../../../@types/DTOs/BayDetailsGetDTO";
import React from "react";
import type { ShelfDetails } from "../../../@types/tables/ShelfDetails";

type LevelProps = {
  bayDetails: BayDetailsGetDTO;
  onClickPallete?: (shelf: ShelfDetails) => void;
};

export default React.memo(function Level({
  bayDetails,
  onClickPallete,
}: LevelProps) {
  return (
    <div className="d-flex gap-1">
      {bayDetails.shelfDetails.map((shelf) => (
        <Pallete key={shelf.id} shelf={shelf} onClickPallete={onClickPallete} />
      ))}
    </div>
  );
});
