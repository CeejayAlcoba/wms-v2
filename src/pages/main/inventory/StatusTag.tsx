import { Tag } from "antd";

type StatusColor = { name: string; color: string };
const colors: StatusColor[] = [
  {
    name: "GOOD ISSUED",
    color: "cyan",
  },
  {
    name: "PICKED",
    color: "gold",
  },
  {
    name: "GOODS RECEIPTED",
    color: "green",
  },
  {
    name: "CHECKED IN",
    color: "red",
  },
];

export default function StatusTag(props: { status: string }) {
  const { status } = props;
  const data = colors.find((c) => c.name == status);
  return <Tag color={data?.color}>{status}</Tag>;
}
