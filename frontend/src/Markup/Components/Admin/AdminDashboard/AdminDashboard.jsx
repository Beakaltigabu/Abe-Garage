import React from 'react';
import { motion } from 'framer-motion';
import { DashboardProvider } from '../../../../Context/DashboardContext';
import { StatCards } from './components/StatCards';
import { SalesChart } from './components/SalesChart';
import { KPISection } from './components/KPISection';
import { PerformanceMetrics } from './components/PerformanceMetrics';
import { RecentActivity } from './components/RecentActivity';
import { QueryClient, QueryClientProvider } from 'react-query';
import styles from './AdminDashboard.module.css';

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30000,
    },
  },
});

const AdminDashboard = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardProvider>
        <motion.div
          className={styles.dashboardContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <StatCards />
          <div className={styles.dashboardGrid}>
            <SalesChart />
            <KPISection />
            <PerformanceMetrics />
            <RecentActivity />
          </div>
        </motion.div>
      </DashboardProvider>
    </QueryClientProvider>
  );
};

export default AdminDashboard;
