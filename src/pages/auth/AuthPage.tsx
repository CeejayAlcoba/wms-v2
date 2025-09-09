import {
  useAuthFormTypeContext,
  type AuthFormType,
} from "../../contexts/useAuthFormTypeContext";
import useWindowWidth from "../../hooks/useWindowWidth";
import ForgotPasswordForm from "./forgotPassword/ForgotPasswordForm";
import { LoginForm } from "./login/LoginForm";
import SideDesign from "./SideDesign";
import { SignupForm } from "./signup/SignupForm";

type FormType = {
  type: AuthFormType;
};
export default function AuthPage() {
  const { windowWidth } = useWindowWidth();
  const { type } = useAuthFormTypeContext();

  return (
    <div
      className="d-flex justify-content-between"
      style={{ backgroundColor: "#00529C" }}
    >
      {windowWidth > 768 && <SideDesign />}
      <Form type={type} />
    </div>
  );
}

const Form = ({ type }: FormType) => {
  if (type === "login") return <LoginForm />;
  else if (type === "signup") return <SignupForm />;
  else if (type === "forgot") return <ForgotPasswordForm />;
};
