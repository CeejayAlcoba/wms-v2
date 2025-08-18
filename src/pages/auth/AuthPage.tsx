import { Card } from "antd";
import { useAuthFormTypeContext } from "../../contexts/useAuthFormTypeContext";
import useWindowWidth from "../../hooks/useWindowWidth";
import { LoginForm } from "./login/LoginForm";
import SideDesign from "./SideDesign";
import { SignupForm } from "./signup/SignupForm";

export default function AuthPage() {
  const { windowWidth } = useWindowWidth();
  const { type } = useAuthFormTypeContext();
  return (
    <div
      className="d-flex justify-content-between"
      style={{  backgroundColor: "#00529C" }}
    >
      {windowWidth > 768 && <SideDesign />}
      {type == "login" ? <LoginForm /> : <SignupForm />}
    </div>
  );
}
