import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "../pages/layouts/MainLayout";
import useUser from "../context/useUser";
import LoginPage from "../pages/auth/login/LoginPage";
import { meService } from "../services/meService";
import PRIVATE_ROUTES from "./constants/PRIVATE_ROUTES";
import { Suspense, useEffect, useState } from "react";
import type { MasterSidebarMenuItem } from "../@types/tables/MasterSidebarMenuItem";
import useSidebar from "../context/useSidebar";
import LoadingScreenLayout from "../pages/layouts/LoadingScreenLayout";

export default function MainRoute() {
  const { user } = useUser();
  const { setLoading } = useSidebar();
  const [menuItems, setMenuItems] = useState<MasterSidebarMenuItem[]>([]);
  const handleGetMenuItems = async () => {
    try {
      setLoading(true);
      const res = await meService.SidebarMenuItems();
      setMenuItems(res);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetMenuItems();
  }, [user]);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <MainLayout /> : <Navigate to="/login" replace />}
        >
          {menuItems.map((item) => {
            const privateRoute = PRIVATE_ROUTES.find(
              (p) => p.key == item.keyName
            );
            return (
              <Route
                path={item.path || ""}
                element={
                  privateRoute ? (
                    <Suspense fallback={<LoadingScreenLayout />}>
                      <privateRoute.element />
                    </Suspense>
                  ) : (
                    <></>
                  )
                }
              />
            );
          })}
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}
