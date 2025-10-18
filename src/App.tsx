import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { store, RootState } from "./store/store";
import "./i18n/config";
import Accounts from "./pages/Accounts";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RawMaterials from "./pages/RawMaterials";
import ProductionLines from "./pages/ProductionLines";
import Employees from "./pages/Employees";
import Orders from "./pages/Orders";
import QualityControl from "./pages/QualityControl";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import { useTranslation } from "react-i18next";
import AccessDenied from "./pages/AccessDenied";

const queryClient = new QueryClient();

// Protected Route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Theme initializer component that must be inside Router
const ThemeInitializer = ({ children }: { children: React.ReactNode }) => {
  const theme = useSelector((state: RootState) => state.theme.mode);
  const { i18n } = useTranslation();

  useEffect(() => {
    // Initialize theme on mount
    document.documentElement.classList.toggle("dark", theme === "dark");

    // Detect direction from current language
    const currentLang = i18n.language || "en";
    const dir = currentLang === "ar" ? "rtl" : "ltr";

    document.documentElement.dir = dir;
    document.documentElement.lang = currentLang;
    console.log(document.documentElement.dir);
  }, [theme, i18n.language]);

  return <>{children}</>;
};

const AppContent = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const role = user?.role;

  return (
    <ThemeInitializer>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              {role === "Owner" || role === "InventoryManager" ? (
                <RawMaterials />
              ) : (
                <AccessDenied />
              )}
            </ProtectedRoute>
          }
        />
        <Route
          path="/production"
          element={
            <ProtectedRoute>
              {role === "Owner" || role === "ProductionManager" ? (
                <ProductionLines />
              ) : (
                <AccessDenied />
              )}
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quality"
          element={
            <ProtectedRoute>
              {role === "Owner" || role === "ProductionManager" ? (
                <QualityControl />
              ) : (
                <AccessDenied />
              )}
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              {role === "Owner" ? <Employees /> : <AccessDenied />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {role === "Owner" ? <Dashboard /> : <AccessDenied />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/accounts"
          element={
            <ProtectedRoute>
              {role === "Owner" ? <Accounts /> : <AccessDenied />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              {role === "Owner" ? <Reports /> : <AccessDenied />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            role === "Owner" ? (
              <Navigate to="/dashboard" replace />
            ) : role === "ProductionManager" ? (
              <Navigate to="/production" replace />
            ) : (
              <Navigate to="/inventory" replace />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeInitializer>
  );
};

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
