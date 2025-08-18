import { Input, Modal } from "antd";
import { useState } from "react";
import TeethOne from "./TeethOne.png";
import TeethTwo from "./TeethTwo.png";

interface ToothData {
  id: number;
  x: number;
  y: number;
  info?: string;
  position?: "left" | "right" | "top" | "bottom";
}

const initialTeeth: ToothData[] = [
  { id: 1, x: 220, y: 50, position: "right" },
  { id: 2, x: 160, y: 60, position: "left" },
  { id: 3, x: 200, y: 70, position: "bottom" },
];

export default function TestPage() {
  const [teeth, setTeeth] = useState<ToothData[]>(initialTeeth);
  const [selectedTooth, setSelectedTooth] = useState<ToothData | null>(null);
  const [inputValue, setInputValue] = useState("");

  const handleSave = () => {
    if (!selectedTooth) return;
    setTeeth((prev) =>
      prev.map((tooth) =>
        tooth.id === selectedTooth.id ? { ...tooth, info: inputValue } : tooth
      )
    );
    setSelectedTooth(null);
    setInputValue("");
  };
  const getInfoStyle = (tooth: ToothData) => {
    const base = {
      position: "absolute" as const,
      background: "#f6ffed",
      border: "1px solid #b7eb8f",
      padding: "4px 8px",
      borderRadius: "6px",
      fontSize: "12px",
      whiteSpace: "nowrap" as const,
    };

    switch (tooth.position) {
      case "left":
        return { ...base, top: tooth.y, left: tooth.x - 80 };
      case "right":
        return { ...base, top: tooth.y, left: tooth.x + 30 };
      case "top":
        return { ...base, top: tooth.y - 30, left: tooth.x };
      case "bottom":
        return { ...base, top: tooth.y + 30, left: tooth.x };
      default:
        return { ...base, top: tooth.y, left: tooth.x + 30 };
    }
  };
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ position: "relative", display: "inline-block" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <img src={TeethOne} alt="Dental Chart" style={{ width: "350px" }} />
          <img src={TeethTwo} alt="Dental Chart" style={{ width: "350px" }} />
        </div>

        {teeth.map((tooth) => (
          <div key={tooth.id}>
            <button
              style={{
                position: "absolute",
                top: tooth.y,
                left: tooth.x,
                width: "25px",
                height: "25px",
                borderRadius: "50%",
                backgroundColor: "red",
                // background: "transparent",
                border: "2px solid transparent",
                cursor: "pointer",
              }}
              onClick={() => {
                setSelectedTooth(tooth);
                setInputValue(tooth.info || "");
              }}
            />

            {tooth.info && <div style={getInfoStyle(tooth)}>{tooth.info}</div>}
          </div>
        ))}
      </div>

      <Modal
        title={selectedTooth?.info ? "Update Tooth Info" : "Add Tooth Info"}
        open={!!selectedTooth}
        onCancel={() => setSelectedTooth(null)}
        onOk={handleSave}
        okText={selectedTooth?.info ? "Update" : "Add"}
      >
        <Input.TextArea
          rows={3}
          placeholder="Enter tooth information..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </Modal>
    </div>
  );
}
