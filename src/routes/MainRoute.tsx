import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "../pages/layouts/MainLayout";
import useUser from "../contexts/useUser";
import PRIVATE_ROUTES from "./constants/PRIVATE_ROUTES";
import { Suspense, useEffect, useState } from "react";
import type { MasterSidebarMenuItem } from "../@types/tables/MasterSidebarMenuItem";
import useSidebar from "../contexts/useSidebar";
import LoadingScreenLayout from "../pages/layouts/LoadingScreenLayout";
import { routeService } from "../services/routeService";
import TestPage from "../pages/main/test/TestPage";
import AuthPage from "../pages/auth/AuthPage";
import NotFoundPage from "../pages/NotFoundPage";
import WrongServerPage from "../pages/WrongServerPage";
import ChangePasswordPage from "../pages/auth/changePassword/ChangePasswordPage";

export default function MainRoute() {
  const { user } = useUser();
  const { setLoading } = useSidebar();
  const [menuItems, setMenuItems] = useState<MasterSidebarMenuItem[]>([]);
  const [is500, setIs500] = useState<boolean>(false);
  const handleGetMenuItems = async () => {
    try {
      setIs500(true);
      setLoading(true);
      const res = await routeService.GetAll();
      setMenuItems(res);
      if (is500) {
        window.location.pathname = "/";
        setIs500(false);
      }
    } catch {
      if (window.location.pathname != "/wrong-server") {
        setIs500(true);
        window.location.pathname = "/wrong-server";
      }
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
        <Route path="/login" element={<AuthPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route
          path="/change-password/:token"
          element={<ChangePasswordPage />}
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<LoadingScreenLayout />}>
              <NotFoundPage />
            </Suspense>
          }
        />
        <Route
          path="/wrong-server"
          element={
            <Suspense fallback={<LoadingScreenLayout />}>
              <WrongServerPage handleGetMenuItems={handleGetMenuItems} />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}
