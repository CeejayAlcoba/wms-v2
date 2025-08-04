import { useState } from "react";
import type { UserDTO } from "./@types/DTOs/UserDTO";
import { UserContext } from "./contexts/useUser";
import MainRoute from "./routes/MainRoute";
import { USER_KEY } from "./constants/LOCAL_STORAGE_KEYS";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarContext } from "./contexts/useSidebar";

const queryClient = new QueryClient();

function App() {
  const handleGetUserLogged = () => {
    const user = localStorage.getItem(USER_KEY);
    if (!user) return null;

    return JSON.parse(user);
  };
  const [user, setUser] = useState<UserDTO | null>(handleGetUserLogged());
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserContext value={{ user, setUser }}>
          <SidebarContext
            value={{ loading, setLoading, collapsed, setCollapsed }}
          >
            <MainRoute />
          </SidebarContext>
        </UserContext>
      </QueryClientProvider>
    </>
  );
}

export default App;
