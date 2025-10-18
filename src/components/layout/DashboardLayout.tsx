import { ReactNode, useState } from 'react';
import { Sidebar } from './Sidebar';
import { ScrollToTop } from '../ScrollToTop';
import i18n from '@/i18n/config';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const dir = i18n.dir(i18n.language);

  return (
    <div className="min-h-screen bg-background overflow-hidden h-screen " dir={dir}>
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}/>
      <main className={`p-8 transition-all duration-300 h-screen  overflow-y-auto ${!isCollapsed? "ms-64":"ms-16"}`}>
        {children}
      </main>
      <ScrollToTop />
    </div>
  );
};
