export default function TableHeaderLayout() {
  return (
    <table
      className="table table-bordered  text-center table-header"
      style={{ marginBottom: 0 }}
    >
      <thead>
        <tr>
          <th style={{ width: "100px" }}>Date</th>
          <th>Particulars</th>
        </tr>
      </thead>
    </table>
  );
}
