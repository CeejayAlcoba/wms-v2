import Pallete from "./Pallete";
import type { BayDetailsGetDTO } from "../../../@types/DTOs/BayDetailsGetDTO";

type LevelProps = {
  bayDetails: BayDetailsGetDTO;
};

export default function Level({ bayDetails }: LevelProps) {
  return (
    <div className="d-flex gap-1">
      {bayDetails.shelfDetails.map((shelf) => (
        <Pallete shelf={shelf} />
      ))}
    </div>
  );
}
