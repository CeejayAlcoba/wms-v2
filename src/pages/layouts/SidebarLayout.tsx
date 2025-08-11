import { Drawer, Menu, Spin, type MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import useSidebar from "../../contexts/useSidebar";
import { useQuery } from "@tanstack/react-query";
import { meService } from "../../services/meService";
import { useLocation, useNavigate } from "react-router-dom";
import AntIcon from "../../components/AntIcon/AntIcon";
import useWindowWidth from "../../hooks/useWindowWidth";

type MenuItem = Required<MenuProps>["items"][number];

export default function SidebarLayout() {
  const { collapsed, loading, setCollapsed } = useSidebar();
  const { windowWidth } = useWindowWidth();
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
          onClick: () => {
            if(windowWidth <= 768){
                setCollapsed(false);
            }
              
            navigate(i.path ?? "");
          },
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
  if (windowWidth <= 768)
    return (
      <Drawer
        open={collapsed}
        placement="left"
        onClose={() => setCollapsed(false)}
        bodyStyle={{ padding: 0, margin: 0 }}
      >
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={[location.pathname]}
          items={sidebarMenus}
        />
      </Drawer>
    );
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} className="overflow-auto">
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
