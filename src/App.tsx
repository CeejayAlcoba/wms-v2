import MainRoute from "./routes/MainRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserProvider from "./contexts/Provider/UserProvider";
import SidebarProvider from "./contexts/Provider/SidebarProvider";
import DocumentProvider from "./contexts/Provider/DocumentProvider";
import { DrawerProvider } from "./contexts/Provider/DrawerProvider";
import { AntConfigProvider } from "./contexts/Provider/AntConfigProvider";
import { initDB } from "./services/indexDbService";
import { useEffect } from "react";
import AuthFromTypeProvider from "./contexts/Provider/AuthFromTypeProvider";

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    initDB();
  }, []);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AntConfigProvider>
          <UserProvider>
            <SidebarProvider>
              <DocumentProvider>
                <DrawerProvider>
                  <AuthFromTypeProvider>
                    <MainRoute />
                  </AuthFromTypeProvider>
                </DrawerProvider>
              </DocumentProvider>
            </SidebarProvider>
          </UserProvider>
        </AntConfigProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
