import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Factory, Package, ShoppingCart } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
  const { t } = useTranslation();
  const materials = useSelector((state: RootState) => state.rawMaterials.materials);
  const lines = useSelector((state: RootState) => state.productionLines.lines);
  const orders = useSelector((state: RootState) => state.orders.orders);

  const runningLines = lines.filter(l => l.status === 'Running');
  const totalProduction = runningLines.reduce((acc, line) => acc + line.currentProduction, 0);
  const totalCapacity = lines.reduce((acc, line) => acc + line.capacity, 0);
  const utilization = totalCapacity > 0 ? Math.round((totalProduction / totalCapacity) * 100) : 0;
  const lowStockItems = materials.filter(m => m.quantity < m.minStock);
  const pendingOrders = orders.filter(o => o.status === 'In Progress');

  // Production trend data (mock for last 7 days)
  const productionTrend = [
    { day: 'Mon', production: 14500 },
    { day: 'Tue', production: 16200 },
    { day: 'Wed', production: 15800 },
    { day: 'Thu', production: 17100 },
    { day: 'Fri', production: 16500 },
    { day: 'Sat', production: 15900 },
    { day: 'Sun', production: totalProduction },
  ];

  // Line performance data
  const linePerformance = runningLines.map(line => ({
    name: line.name.split(' - ')[0],
    efficiency: line.efficiency,
  }));

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--success))', 'hsl(var(--warning))'];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">{t('dashboard.title')}</h1>
          <p className="text-muted-foreground">{t('dashboard.description')}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t('dashboard.dailyProduction')}
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalProduction.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">{t('dashboard.units')}</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-accent">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t('dashboard.lineUtilization')}
              </CardTitle>
              <Factory className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{utilization}%</div>
              <p className="text-xs text-muted-foreground mt-1">
                {runningLines.length} / {lines.length} lines active
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-warning">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t('dashboard.lowStock')}
              </CardTitle>
              <Package className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{lowStockItems.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Items need restocking</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-success">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t('dashboard.pendingOrders')}
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pendingOrders.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Orders in progress</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.productionTrend')}</CardTitle>
              <CardDescription>Weekly production overview</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={productionTrend}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="day" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="production" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.linePerformance')}</CardTitle>
              <CardDescription>Efficiency by production line</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={linePerformance}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem'
                    }}
                  />
                  <Bar dataKey="efficiency" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.recentActivity')}</CardTitle>
            <CardDescription>Latest updates from your factory</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {lowStockItems.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-warning" />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Stock: {item.quantity} {item.unit} (Min: {item.minStock})
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="border-warning text-warning">
                  Low Stock
                </Badge>
              </div>
            ))}
            {pendingOrders.slice(0, 2).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{order.orderNumber}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.client} - {order.quantity} {order.unit}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="border-primary text-primary">
                  {order.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
