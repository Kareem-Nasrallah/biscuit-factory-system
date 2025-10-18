import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileDown, FileText } from 'lucide-react';

const Reports = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Reports</h1>
          <p className="text-muted-foreground">Generate and export factory reports</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle>Production Report</CardTitle>
              </div>
              <CardDescription>
                Comprehensive production statistics and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full gap-2">
                <FileDown className="h-4 w-4" />
                Export PDF
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-accent" />
                <CardTitle>Raw Materials Report</CardTitle>
              </div>
              <CardDescription>
                Inventory levels and usage patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full gap-2">
                <FileDown className="h-4 w-4" />
                Export Excel
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-success" />
                <CardTitle>Quality Control Report</CardTitle>
              </div>
              <CardDescription>
                Inspection results and defect analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full gap-2">
                <FileDown className="h-4 w-4" />
                Export PDF
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-warning" />
                <CardTitle>Line Performance Report</CardTitle>
              </div>
              <CardDescription>
                Efficiency metrics and maintenance records
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full gap-2">
                <FileDown className="h-4 w-4" />
                Export Excel
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
