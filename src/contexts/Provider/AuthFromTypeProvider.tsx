import { useState, type ReactNode } from "react";
import { AuthFormTypeContext, type AuthFormType } from "../useAuthFormTypeContext";


export default function AuthFromTypeProvider(props: { children: ReactNode }) {
  const { children } = props;
  const [type, setType] = useState<AuthFormType>("login");
  return (
    <AuthFormTypeContext.Provider value={{ type, setType }}>
      {children}
    </AuthFormTypeContext.Provider>
  );
}
