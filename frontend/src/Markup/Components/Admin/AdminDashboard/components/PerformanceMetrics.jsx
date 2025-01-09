import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useEmployeePerformance } from '../../../../../hooks/useDashboardData';
import styles from './PerformanceMetrics.module.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export const PerformanceMetrics = () => {
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const { data: performanceData, isLoading } = useEmployeePerformance();

  const metrics = [
    { id: 'revenue', label: 'Revenue' },
    { id: 'completedOrders', label: 'Completed Orders' },
    { id: 'totalOrders', label: 'Total Orders' }
  ];

  const chartData = performanceData?.map(employee => ({
    name: employee.name,
    revenue: parseFloat(employee.revenue).toFixed(2),
    completedOrders: employee.completedOrders,
    totalOrders: employee.totalOrders
  })) || [];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={styles.performanceContainer}
    >
      <div className={styles.metricsHeader}>
        <h2>Employee Performance</h2>
        <div className={styles.metricSelector}>
          {metrics.map(metric => (
            <motion.button
              key={metric.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${styles.metricButton} ${selectedMetric === metric.id ? styles.active : ''}`}
              onClick={() => setSelectedMetric(metric.id)}
            >
              {metric.label}
            </motion.button>
          ))}
        </div>
      </div>

      <motion.div
        className={styles.chartContainer}
        variants={itemVariants}
      >
        {isLoading ? (
          <div className={styles.loading}>Loading performance data...</div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
              <Bar
                dataKey={selectedMetric}
                fill="#081e5b"
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </motion.div>

      <motion.div
        className={styles.performersList}
        variants={itemVariants}
      >
        {performanceData?.map((performer, index) => (
          <motion.div
            key={performer.id}
            className={styles.performerCard}
            whileHover={{ scale: 1.02 }}
            variants={itemVariants}
          >
            <div className={styles.rank}>#{index + 1}</div>
            <div className={styles.performerInfo}>
              <h4>{performer.name}</h4>
              <p>
                {selectedMetric === 'revenue' && `$${parseFloat(performer.revenue).toFixed(2)}`}
                {selectedMetric === 'completedOrders' && `${performer.completedOrders} orders`}
                {selectedMetric === 'totalOrders' && `${performer.totalOrders} orders`}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};
