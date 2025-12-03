import type { CSSProperties } from "react";
import Draggable from "../../../components/Draggable/Draggable";

const th: CSSProperties = {
  border: "1px solid #000",
  padding: 6,
  textAlign: "center",
  background: "#f4f4f4",
};

const mainTh: CSSProperties = {
  background: "#dfe2e6",
};

const mainTd: CSSProperties = {
  fontWeight: "bold",
};

export default function TestPage() {
  return (
    <>
      <table className="table text-center" style={{ marginBottom: 0 }}>
        <thead style={{ backgroundColor: "grey" }}>
          <tr>
            <th style={{ width: "100px", ...mainTh }}>Date</th>
            <th style={{ ...mainTh }}>Particulars</th>
            <th style={{ width: "100px", ...mainTh }}></th>
            <th style={{ width: "100px", ...mainTh }}></th>
          </tr>
        </thead>
      </table>

      <table className="table text-center">
        <thead>
          <tr>
            <th style={{ width: "100px" }}></th>
            <th className="text-danger">OCR</th>
            <th className="text-danger">OCR</th>
            <th className="text-danger">OCR</th>
            <th></th>
            <th></th>
            <th style={{ width: "100px" }}></th>
            <th style={{ width: "100px" }}></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{ width: "100px", ...mainTd }}></td>
            <td className="d-flex justify-content-around" style={{ ...mainTd }}>
              <div>HANDLING IN CHARGES</div> <div>73.382</div>
            </td>
            <td style={{ width: "100px" }}>Php123/cbm</td>
            <td style={{ width: "100px" }}>10,273.40</td>
          </tr>
          <tr>
            <td>2020-01-01</td>
            <td>123</td>
            <td>123</td>
            <td>123</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>2020-01-01</td>
            <td>123</td>
            <td>123</td>
            <td>123</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
