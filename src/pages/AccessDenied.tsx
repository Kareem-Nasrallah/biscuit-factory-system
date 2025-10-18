import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { LogOut, ArrowLeft } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice"; // تأكد من مسار السلايس
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const AccessDenied: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoBack = () => navigate(-1);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-center min-h-screen bg-background px-4">
        <Card className="max-w-md w-full shadow-lg text-center animate-fade-in rounded-2xl -translate-y-[20%]">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-destructive">
              {t("accessDenied.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              {t("accessDenied.message")}
            </p>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={handleGoBack} variant="outline" className="gap-2">
              <ArrowLeft size={16} />
              {t("accessDenied.goBack")}
            </Button>
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="gap-2"
            >
              <LogOut size={16} />
              {t("accessDenied.logout")}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AccessDenied;
