import Pallete from "./Pallete";
import React from "react";
import type { ShelfDetails } from "../../../@types/tables/ShelfDetails";
import { Card } from "antd";

type LevelProps = {
  shelfDetails: ShelfDetails[];
  onClickPallete?: (shelf: ShelfDetails) => void;
};

export default React.memo(function Level({
  shelfDetails,
  onClickPallete,
}: LevelProps) {
  if (shelfDetails.length == 0) return <Card loading />;

  return (
    <div className="d-flex gap-1">
      {shelfDetails.map((shelf) => (
        <Pallete key={shelf.id} shelf={shelf} onClickPallete={onClickPallete} />
      ))}
    </div>
  );
});
