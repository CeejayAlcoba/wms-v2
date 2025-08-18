import { lazy, type JSX } from "react";

type PageRouteType = {
  key: string;
  element: React.LazyExoticComponent<() => JSX.Element>;
};

const PRIVATE_ROUTES: PageRouteType[] = [
  {
    key: "Dashboard",
    element: lazy(() => import("../../pages/main/dashboard/IndexPage")),
  },
  {
    key: "SidebarMenu",
    element: lazy(() => import("../../pages/main/sidebarMenu/IndexPage")),
  },
  {
    key: "SidebarItem",
    element: lazy(() => import("../../pages/main/sidebarItems/IndexPage")),
  },
  {
    key: "AntIcon",
    element: lazy(() => import("../../pages/main/antIcon/IndexPage")),
  },
  {
    key: "Principal",
    element: lazy(() => import("../../pages/main/principal/IndexPage")),
  },
  {
    key: "Product",
    element: lazy(() => import("../../pages/main/productCategory/IndexPage")),
  },
  {
    key: "BillType",
    element: lazy(() => import("../../pages/main/billType/IndexPage")),
  },
  {
    key: "TruckType",
    element: lazy(() => import("../../pages/main/truckType/IndexPage")),
  },
  {
    key: "TruckDetails",
    element: lazy(() => import("../../pages/main/truckDetails/IndexPage")),
  },
  {
    key: "BillingStatement",
    element: lazy(() => import("../../pages/main/billingStatement/IndexPage")),
  },
  {
    key: "CheckInByICR",
    element: lazy(() => import("../../pages/main/checkInByICR/IndexPage")),
  },
  {
    key: "CargoType",
    element: lazy(() => import("../../pages/main/cargoType/IndexPage")),
  },
  {
    key: "UnitOfMeasurement",
    element: lazy(() => import("../../pages/main/unitOfMeasurement/IndexPage")),
  },
  {
    key: "GoodsReceipt",
    element: lazy(() => import("../../pages/main/goodsReceipt/IndexPage")),
  },
  {
    key: "Inbound",
    element: lazy(() => import("../../pages/main/inbound/IndexPage")),
  },
  {
    key: "PickList",
    element: lazy(() => import("../../pages/main/picklist/IndexPage")),
  },
  {
    key: "GoodIssue",
    element: lazy(() => import("../../pages/main/goodIssue/IndexPage")),
  },
  {
    key: "Inventory",
    element: lazy(() => import("../../pages/main/inventory/IndexPage")),
  },
   {
    key: "Outbound",
    element: lazy(() => import("../../pages/main/outbound/IndexPage")),
  },
  {
    key: "Users",
    element: lazy(() => import("../../pages/main/users/IndexPage")),
  },
  {
    key: "Role",
    element: lazy(() => import("../../pages/main/role/IndexPage")),
  },
  {
    key: "Test",
    element: lazy(() => import("../../pages/main/test/TestPage")),
  },
];

export default PRIVATE_ROUTES;
