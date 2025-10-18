import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Factory,
  Users,
  ShoppingCart,
  ClipboardCheck,
  FileText,
  LogOut,
  Menu,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { RootState } from "@/store/store";
import { Button } from "../ui/button";
import { ThemeToggle } from "../ThemeToggle";
import { LanguageToggle } from "../LanguageToggle";
import { Dispatch, SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";

interface SidebarProp {
  isCollapsed: boolean;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
}
export const Sidebar = ({ isCollapsed, setIsCollapsed }: SidebarProp) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const navItems = [
    {
      path: "/dashboard",
      icon: LayoutDashboard,
      label: t("nav.dashboard"),
      roles: ["Owner", ],
    },
    {
      path: "/inventory",
      icon: Package,
      label: t("nav.inventory"),
      roles: ["Owner", "InventoryManager"],
    },
    {
      path: "/production",
      icon: Factory,
      label: t("nav.productionLines"),
      roles: ["Owner", "ProductionManager"],
    },
    {
      path: "/employees",
      icon: Users,
      label: t("nav.employees"),
      roles: ["Owner", ],
    },
    {
      path: "/orders",
      icon: ShoppingCart,
      label: t("nav.orders"),
      roles: ["Owner", "InventoryManager", "ProductionManager"],
    },
    {
      path: "/quality",
      icon: ClipboardCheck,
      label: t("nav.qualityControl"),
      roles: ["Owner", "ProductionManager"],
    },
    {
      path: "/accounts",
      icon: FileText,
      label: t("nav.accounts"),
      roles: ["Owner", ],
    },
    {
      path: "/reports",
      icon: FileText,
      label: t("nav.reports"),
      roles: ["Owner", ],
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const filteredNavItems = navItems.filter(
    (item) => user && item.roles.includes(user.role)
  );

  return (
    <aside
      className={cn(
        "fixed start-0 top-0 z-40 h-screen border-r bg-card transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          {!isCollapsed && (
            <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Biscuit Factory
            </h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
          {filteredNavItems.map((item) => {
            item.path === "/";
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    isCollapsed && "justify-center"
                  )
                }
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t p-4">
          <div className="flex items-center gap-2 mb-3">
            <ThemeToggle />
            <LanguageToggle />
          </div>
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            {!isCollapsed && <span>{t("nav.logout")}</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
};
