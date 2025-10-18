import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

const QualityControl = () => {
  const { t, i18n } = useTranslation();
  const inspections = useSelector(
    (state: RootState) => state.qualityControl.inspections
  );

  const getQualityBadge = (quality: string, approved: boolean) => {
    if (quality === "Rejected" || !approved) {
      return (
        <Badge
          variant="outline"
          className="border-destructive text-destructive gap-1"
        >
          <XCircle className="h-3 w-3" />
          {t("quality.rejected")}
        </Badge>
      );
    }
    if (quality === "A") {
      return (
        <Badge variant="outline" className="border-success text-success gap-1">
          <CheckCircle2 className="h-3 w-3" />
          {t("quality.gradeA")}
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="border-warning text-warning gap-1">
        <AlertCircle className="h-3 w-3" />
        {t("quality.gradeB")}
      </Badge>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">{t("quality.title")}</h1>
          <p className="text-muted-foreground">{t("quality.description")}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Inspection Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("quality.batchNumber")}</TableHead>
                    <TableHead>{t("quality.inspectionDate")}</TableHead>
                    <TableHead>{t("quality.quality")}</TableHead>
                    <TableHead>{t("quality.defectRate")}</TableHead>
                    <TableHead>{t("quality.notes")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inspections.map((inspection) => (
                    <TableRow key={inspection.id}>
                      <TableCell className="font-medium">
                        {inspection.batchNumber}
                      </TableCell>
                      <TableCell>
                        {new Date(
                          inspection.inspectionDate
                        ).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {getQualityBadge(
                          inspection.quality,
                          inspection.approved
                        )}
                      </TableCell>
                      <TableCell>
                        <span
                          className={
                            inspection.defectRate > 5
                              ? "text-destructive font-semibold"
                              : "text-success"
                          }
                        >
                          {inspection.defectRate}%
                        </span>
                      </TableCell>
                      <TableCell className="max-w-xs truncate text-muted-foreground">
                        {i18n.language === "ar"
                          ? inspection.notesAr
                          : inspection.notes}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default QualityControl;
