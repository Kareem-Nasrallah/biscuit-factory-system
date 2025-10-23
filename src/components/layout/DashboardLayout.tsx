import { ReactNode, useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { ScrollToTop } from "../ScrollToTop";
import i18n from "@/i18n/config";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const dir = i18n.dir(i18n.language);
  const path = window.location.pathname;

  useEffect(() => {
    setIsCollapsed(true);
  }, [path]);

  return (
    <div
      className="min-h-screen bg-background overflow-hidden h-screen "
      dir={dir}
    >
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        className={`py-8 px-4 xs:px-8 transition-all duration-300 h-screen  overflow-y-auto ${
          !isCollapsed ? "ms-0 sm:ms-56 md:ms-64" : "ms-0 xs:ms-16"
        }`}
      >
        {children}
      </main>
      <ScrollToTop />
    </div>
  );
};
