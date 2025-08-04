import useWindowWidth from "../../../hooks/useWindowWidth";
import { LoginForm } from "./LoginForm";
import SideDesign from "./SideDesign";

export default function LoginPage() {
  const { windowWidth } = useWindowWidth();
  return (
    <div
      className="d-flex justify-content-between"
      style={{ width: "100vw", height: "100vh", backgroundColor: "#00529C" }}
    >
      {windowWidth > 768 && <SideDesign />}
      <LoginForm />
    </div>
  );
}
