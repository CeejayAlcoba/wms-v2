import type { ShelfDetails } from "../../../../@types/tables/ShelfDetails";
import ToggleTag from "../../../../components/Toggle/ToggleTag";

type Props = {
  shelfDetails: ShelfDetails | null;
};

export default function ShelfInfo({ shelfDetails }: Props) {
  return (
    <div className="col-md-8">
      <div className="row mb-2">
        <div className="col-5 fw-bold">Shelf:</div>
        <div className="col-7">{shelfDetails?.name ?? "-"}</div>
      </div>

      <div className="row mb-2">
        <div className="col-5 fw-bold">Occupied:</div>
        <div className="col-7">
          {<ToggleTag data={!!shelfDetails?.isOccupied} />}
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-5 fw-bold">Content Value:</div>
        <div className="col-7">{shelfDetails?.contentValue}</div>
      </div>
    </div>
  );
}
