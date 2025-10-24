import { Input, theme } from "antd";
import type { ShelfDetails } from "../../../@types/tables/ShelfDetails";
import { useState } from "react";
import { shelfDetailsService } from "../../../services/shelfDetailsService";

type PalleteProps = {
  shelf: ShelfDetails;
};

export default function Pallete({ shelf }: PalleteProps) {
  const { token } = theme.useToken();
  const [shelfDetails, setShelfDetails] = useState<ShelfDetails>(shelf);

  const handleInputBlur = async (value: string) => {
    console.log({
      ...shelf,
      name: value,
    });
    await shelfDetailsService.Update(shelf.id ?? 0, {
      ...shelf,
      name: value,
    });
  };
  return (
    <div
      className="col p-1"
      style={{
        backgroundColor: token.colorPrimary,
      }}
    >
      <Input
        size="small"
        value={shelfDetails.name ?? ""}
        onChange={(e) =>
          setShelfDetails((prev) => ({ ...prev, name: e.target.value }))
        }
        onBlur={(e) => handleInputBlur(e.target.value)}
      />
    </div>
  );
}
