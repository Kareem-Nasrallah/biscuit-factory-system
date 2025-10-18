import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const Accounts = () => {
  const { t } = useTranslation();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">{t("accounts.title")}</h1>
          <p className="text-muted-foreground">{t("accounts.description")}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("common.comingSoon")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              {t("accounts.description")}{" "}
              {t("common.willBe")}
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Accounts;
