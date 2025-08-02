import { Menu, Spin, type MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import useSidebar from "../../context/useSidebar";
import { useQuery } from "@tanstack/react-query";
import { meService } from "../../services/meService";
import { useLocation, useNavigate } from "react-router-dom";
import AntIcon from "../../components/AntIcon/AntIcon";

type MenuItem = Required<MenuProps>["items"][number];

export default function SidebarLayout() {
  const { collapsed, loading } = useSidebar();
  const navigate = useNavigate();
  const handleMapMenu = async () => {
    const menus = await meService.Sidebar();
    let items: MenuItem[] = [];
    menus?.map((m) => {
      const menuItems = m.items?.map((i) => {
        return {
          label: i.name,
          key: i?.path || "",
          icon: <AntIcon icon={i?.antIcon || ""} />,
          onClick: () => navigate(i.path ?? ""),
        };
      });

      if (m.id == null) {
        items = [...items, ...menuItems];
      } else {
        items.push({
          label: m.name,
          key: m?.name || "",
          icon: <AntIcon icon={m.antIcon || ""} />,
          children: menuItems,
        });
      }
    });

    return items;
  };
  const { data: sidebarMenus } = useQuery({
    queryKey: ["sidebar"],
    queryFn: handleMapMenu,
    initialData: [],
  });
  const location = useLocation();
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical" />
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Spin tip="Loading" size="large" />
        </div>
      ) : (
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={[location.pathname]}
          items={sidebarMenus}
        />
      )}
    </Sider>
  );
}
