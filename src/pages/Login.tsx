import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "@/store/slices/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { Factory } from "lucide-react";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      setLoginError("");
      dispatch(login(values));

      // Check if login was successful by checking localStorage
      const userSaved = localStorage.getItem("user");
      const pressUser = JSON.parse(userSaved || "null");
      console.log(pressUser);
      setTimeout(() => {
        if (userSaved) {
          toast.success("Login successful!");
          if (pressUser.role === "Owner") {
            navigate("/dashboard", { replace: true });
          } else if (pressUser.role === "ProductionManager") {
            navigate("/production", { replace: true });
          } else if (pressUser.role === "InventoryManager") {
            navigate("/inventory", { replace: true });
          }
        } else {
          setLoginError("Invalid username or password");
          toast.error("Invalid credentials");
        }
      }, 200);
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-primary/5 to-accent/5 p-4">
      <div className="absolute top-4 right-4 flex gap-2">
        <ThemeToggle />
        <LanguageToggle />
      </div>

      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto w-fit rounded-full bg-primary p-4">
            <Factory className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold">
            {t("auth.welcomeBack")}
          </CardTitle>
          <CardDescription>{t("auth.loginSubtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">{t("auth.username")}</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder={t("auth.username")}
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.username && formik.errors.username
                    ? "border-destructive"
                    : ""
                }
              />
              {formik.touched.username && formik.errors.username && (
                <p className="text-sm text-destructive">
                  {formik.errors.username}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("auth.password")}</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder={t("auth.password")}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.password && formik.errors.password
                    ? "border-destructive"
                    : ""
                }
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-sm text-destructive">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {loginError && (
              <p className="text-sm text-destructive text-center">
                {loginError}
              </p>
            )}

            <Button type="submit" className="w-full" size="lg">
              {t("auth.login")}
            </Button>

            <div className="mt-4 p-2 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground text-center mb-4">
                {t("auth.Credentials.title")}
              </p>
              <div className="space-y-1 text-xs flex flex-col items-start gap-4">
                <div className="flex justify-start gap-12 2xs:gap-16">
                  <strong className="whitespace-nowrap w-20 mt-2 xs:mt-0 me-2 text-satrt">{t("auth.Credentials.owner")} :</strong>
                  <div className="flex flex-col xs:flex-row gap-1 xs:gap-8">
                    <span className="xs:me-14">owner</span>
                    <span>owner123</span>
                  </div>
                </div>
                <div className="flex justify-start gap-4 2xs:gap-8">
                  <strong className="whitespace-nowrap mt-2 xs:mt-0">{t("auth.Credentials.productionManager")} :</strong>
                  <div className="flex flex-col xs:flex-row gap-1 xs:gap-8">
                    <span>production_mgr</span>
                    <span>productionMgr123</span>
                  </div>
                </div>
                <div className="flex justify-start gap-6 2xs:gap-10">
                  <strong className="whitespace-nowrap mt-2 xs:mt-0">{t("auth.Credentials.inventoryManager")} :</strong>
                  <div className="flex flex-col xs:flex-row gap-1 xs:gap-8">
                    <span className="xs:me-2">inventory_mgr</span>
                    <span>inventoryMgr123</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
