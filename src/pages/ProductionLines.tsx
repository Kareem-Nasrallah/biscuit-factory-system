import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Factory, Activity, Clock } from 'lucide-react';

const ProductionLines = () => {
  const { t, i18n } = useTranslation();
  const lines = useSelector((state: RootState) => state.productionLines.lines);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Running':
        return 'border-success text-success';
      case 'Stopped':
        return 'border-destructive text-destructive';
      case 'Maintenance':
        return 'border-warning text-warning';
      default:
        return 'border-muted text-muted-foreground';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'Running':
        return 'bg-success/10';
      case 'Stopped':
        return 'bg-destructive/10';
      case 'Maintenance':
        return 'bg-warning/10';
      default:
        return 'bg-muted';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">{t('productionLines.title')}</h1>
          <p className="text-muted-foreground">{t('productionLines.description')}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {lines.map((line) => (
            <Card key={line.id} className={`overflow-hidden ${getStatusBg(line.status)}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Factory className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">
                      {i18n.language === 'ar' ? line.nameAr : line.name}
                    </CardTitle>
                  </div>
                  <Badge variant="outline" className={getStatusColor(line.status)}>
                    {t(`productionLines.${line.status.toLowerCase()}`)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Production Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{t('productionLines.currentProduction')}</span>
                    <span className="font-medium">
                      {line.currentProduction.toLocaleString()} / {line.capacity.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={(line.currentProduction / line.capacity) * 100} className="h-2" />
                </div>

                {/* Efficiency */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium">{t('productionLines.efficiency')}</span>
                  </div>
                  <span className="text-2xl font-bold text-accent">{line.efficiency}%</span>
                </div>

                {/* Next Maintenance */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>
                    {t('productionLines.nextMaintenance')}: {new Date(line.nextMaintenance).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProductionLines;
