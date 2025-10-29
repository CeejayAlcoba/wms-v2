import { Input, theme, Typography } from "antd";
import type { ShelfDetails } from "../../../@types/tables/ShelfDetails";
import { useState } from "react";
import { shelfDetailsService } from "../../../services/shelfDetailsService";
import useRackContext from "./__context__/useRackContext";
import React from "react";

type PalleteProps = {
  shelf: ShelfDetails;
  onClickPallete?: (shelf: ShelfDetails) => void;
};

const { Text } = Typography;

export default React.memo(function Pallete({
  shelf,
  onClickPallete,
}: PalleteProps) {
  const { token } = theme.useToken();
  const { readonly } = useRackContext();
  const [shelfDetails, setShelfDetails] = useState<ShelfDetails>(shelf);

  const handleInputBlur = async (value: string) => {
    await shelfDetailsService.Update(shelf.id ?? 0, {
      ...shelf,
      name: value,
    });
  };

  return (
    <div
      onClick={() => {
        onClickPallete && onClickPallete(shelf);
      }}
      className="col p-1"
      style={{
        cursor: readonly ? "pointer" : "none",
        backgroundColor:
          shelf.isOccupied && readonly ? token.colorError : token.colorPrimary,
      }}
    >
      {readonly ? (
        <Text strong className="text-light">
          {shelfDetails.name}
        </Text>
      ) : (
        <Input
          size="small"
          value={shelfDetails.name ?? ""}
          onChange={(e) =>
            setShelfDetails((prev) => ({ ...prev, name: e.target.value }))
          }
          onBlur={(e) => handleInputBlur(e.target.value)}
        />
      )}
    </div>
  );
});
