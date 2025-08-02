import { lazy, type JSX } from "react";

type PageRouteType = {
  key: string;
  element: React.LazyExoticComponent<() => JSX.Element>;
};

const PRIVATE_ROUTES: PageRouteType[] = [
  {
    key: "Dashboard",
    element: lazy(() => import("../../pages/main/dashboard/DashboardPage")),
  },
  {
    key: "SidebarMenu",
    element: lazy(() => import("../../pages/main/sidebarMenu/SidebarMenuPage")),
  },
  {
    key: "SidebarItem",
    element: lazy(
      () => import("../../pages/main/sidebarItems/SidebarItemPage")
    ),
  },
  {
    key: "AntIcon",
    element: lazy(() => import("../../pages/main/antIcon/AntIconPage")),
  },
  {
    key: "Principal",
    element: lazy(() => import("../../pages/main/principal/PrincipalPage")),
  },
  {
    key: "Product",
    element: lazy(
      () => import("../../pages/main/productCategory/ProductCategoryPage")
    ),
  },
  {
    key: "BillType",
    element: lazy(() => import("../../pages/main/billType/BillTypePage")),
  },
  {
    key: "TruckType",
    element: lazy(() => import("../../pages/main/truckType/TruckTypePage")),
  },
  {
    key: "TruckDetails",
    element: lazy(
      () => import("../../pages/main/truckDetails/TruckDetailsPage")
    ),
  },
  {
    key: "BillingStatement",
    element: lazy(
      () => import("../../pages/main/billingStatement/BillingStatementPage")
    ),
  },
  {
    key: "Test",
    element: lazy(() => import("../../pages/main/test/TestPage")),
  },
];

export default PRIVATE_ROUTES;
