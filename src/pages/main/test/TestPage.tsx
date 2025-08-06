import useDocument from "../../../contexts/useDocument";
import PrintTable from "../../../components/Documents/Print/PrintTable";
import DownloadPdfTable from "../../../components/Documents/Pdf/PdfTable";

export default function TestPage() {
  const data = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
    { id: 2, name: "Bob", age: 30 },
    { id: 2, name: "Bob", age: 30 },
    { id: 2, name: "Bob", age: 30 },
    { id: 2, name: "Bob", age: 30 },
    { id: 2, name: "Bob", age: 30 },
    { id: 2, name: "Bob", age: 30 },
    { id: 2, name: "Bob", age: 30 },
    { id: 2, name: "Bob", age: 30 },
    { id: 2, name: "Bob", age: 30 },
    { id: 2, name: "Bob", age: 30 },
    { id: 2, name: "Bob", age: 30 },
    { id: 2, name: "Bob", age: 30 },
    { id: 2, name: "Bob", age: 30 },
    { id: 2, name: "Bob", age: 30 },
    { id: 2, name: "Bob", age: 30 },
    { id: 2, name: "Bob", age: 30 },
    { id: 2, name: "Bob", age: 30 },
    { id: 2, name: "Bob", age: 30 },
    { id: 2, name: "Bob", age: 30 },
    { id: 2, name: "Bob", age: 30 },
    { id: 2, name: "Bob", age: 30 },
    { id: 2, name: "Bob", age: 30 },
    { id: 2, name: "Bob", age: 30 },
    { id: 2, name: "Bob", age: 30 },
    { id: 2, name: "Bob", age: 30 },
    { id: 2, name: "Bob", age: 30 },
    { id: 2, name: "Bob", age: 30 },
    { id: 2, name: "Bob", age: 30 },
    { id: 2, name: "Bob", age: 30 },
    { id: 2, name: "Bob", age: 30 },
    { id: 2, name: "Bob", age: 30 },
    { id: 2, name: "Bob", age: 30 },
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
  ];
  const {
    setTitle,
    setData,
    setColumns,
    setProgress,
    handleDownloadPdf: download,
    handlePrint: print,
  } = useDocument();
  const handlePrint = () => {
    setTitle("test");
    setData(data);
    setColumns(columns);
    print();
  };
  const handleDownload = () => {
    setTitle("test");
    setData(data);
    setColumns(columns);
    download();
  };
  return (
    <>
      <DownloadPdfTable onDownload={() => handleDownload()} />
      <PrintTable onPrint={() => handlePrint()} />
    </>
  );
}
