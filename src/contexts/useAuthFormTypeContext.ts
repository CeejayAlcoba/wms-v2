import { createContext, useContext } from "react";

export type AuthFormType = "login" | "signup" | "forgot";

interface AuthFormTypeContext {
  type: AuthFormType;
  setType: React.Dispatch<React.SetStateAction<AuthFormType>>;
}

export const AuthFormTypeContext = createContext<AuthFormTypeContext | null>(
  null
);

export const useAuthFormTypeContext = () => {
  const context = useContext(AuthFormTypeContext);
  if (!context)
    throw new Error(
      "useAuthFormTypeContext must be used within AuthFormTypeProvider"
    );
  return context;
};
