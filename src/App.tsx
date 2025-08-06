import MainRoute from "./routes/MainRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserProvider from "./contexts/Provider/UserProvider";
import SidebarProvider from "./contexts/Provider/SidebarProvider";
import DocumentProvider from "./contexts/Provider/DocumentProvider";
import { DrawerProvider } from "./contexts/Provider/DrawerProvider";
import { AntConfigProvider } from "./contexts/Provider/AntConfigProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AntConfigProvider>
          <UserProvider>
            <SidebarProvider>
              <DocumentProvider>
                <DrawerProvider>
                  <MainRoute />
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
