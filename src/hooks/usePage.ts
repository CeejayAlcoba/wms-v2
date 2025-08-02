import { useLocation } from "react-router-dom";

export default function usePage() {
  const location = useLocation();
  const pathName = location.pathname.split("-").join(" ");
  const title = pathName
    .replace(/\//g, " ")
    .replace(/\w+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .trim();
  return { title };
}
