export default function TableHeaderLayout() {
  const backgroundColor = "#b8daff";
  return (
    <thead>
      <tr className="text-center">
        <th style={{ backgroundColor, width: "100px" }}>DATE</th>
        <th style={{ backgroundColor }}>PARTICULARS</th>
      </tr>
    </thead>
  );
}
