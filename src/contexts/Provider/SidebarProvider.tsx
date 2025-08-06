import React, { useState } from "react";
import { SidebarContext } from "../useSidebar";

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <SidebarContext.Provider
      value={{ loading, setLoading, collapsed, setCollapsed }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
