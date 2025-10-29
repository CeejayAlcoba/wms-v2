import Pallete from "./Pallete";
import type { BayDetailsGetDTO } from "../../../@types/DTOs/BayDetailsGetDTO";
import React from "react";

type LevelProps = {
  bayDetails: BayDetailsGetDTO;
};

export default React.memo(function Level({ bayDetails }: LevelProps) {
  return (
    <div className="d-flex gap-1">
      {bayDetails.shelfDetails.map((shelf) => (
        <Pallete key={shelf.id} shelf={shelf} />
      ))}
    </div>
  );
});
