import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Calendar, AlertCircle } from 'lucide-react';

const Orders = () => {
  const { t, i18n } = useTranslation();
  const orders = useSelector((state: RootState) => state.orders.orders);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Shipped':
        return 'border-success text-success bg-success/10';
      case 'Ready':
        return 'border-primary text-primary bg-primary/10';
      case 'In Progress':
        return 'border-warning text-warning bg-warning/10';
      default:
        return 'border-muted text-muted-foreground bg-muted';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'border-destructive text-destructive';
      case 'Medium':
        return 'border-warning text-warning';
      case 'Low':
        return 'border-muted text-muted-foreground';
      default:
        return 'border-muted text-muted-foreground';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">{t('orders.title')}</h1>
          <p className="text-muted-foreground">{t('orders.description')}</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-2 mb-4 flex-wrap">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold whitespace-nowrap">{order.orderNumber}</h3>
                      <Badge variant="outline" className={getPriorityColor(order.priority)}>
                        {t(`orders.${order.priority.toLowerCase()}`)} Priority
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">
                      {i18n.language === 'ar' ? order.clientAr : order.client}
                    </p>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {t(`orders.${order.status.toLowerCase().replace(' ', '')}`)}
                  </Badge>
                </div>

                <div className="flex justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Package className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">{t('orders.quantity')}</p>
                      <p className="font-semibold">
                        {order.quantity.toLocaleString()} {order.unit}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Calendar className="h-5 w-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">{t('orders.deliveryDate')}</p>
                      <p className="font-semibold">
                        {new Date(order.deliveryDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <AlertCircle className="h-5 w-5 text-warning" />
                    <div>
                      <p className="text-sm text-muted-foreground">Order Date</p>
                      <p className="font-semibold">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Orders;
