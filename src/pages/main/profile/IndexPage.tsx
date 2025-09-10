import { useState } from "react";
import InitialPasswordForm from "./InitialPasswordForm";
import type { ProfileDTO } from "../../../@types/DTOs/ProfileDTO";
import EditForm from "./EditForm";

export default function IndexPage() {
  const [user, setUser] = useState<ProfileDTO | null>(null);

  const handleSetUser = (value: ProfileDTO | null) => {
    setUser(value);
  };
  if (!user)
    return (
      <InitialPasswordForm
        onSucess={(data) => {
          setUser(data);
        }}
      />
    );

  return <EditForm user={user} handleSetUser={handleSetUser} />;
}
