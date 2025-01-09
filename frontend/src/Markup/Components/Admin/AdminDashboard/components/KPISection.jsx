import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { FaChartLine, FaUsers, FaMoneyBillWave } from 'react-icons/fa';
import { useKPIMetrics } from '../../../../../hooks/useDashboardData';
import styles from './KPISection.module.css';

const kpiVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const KPICard = ({ title, value, percentage, icon: Icon, trend }) => (
  <motion.div
    variants={kpiVariants}
    whileHover={{ scale: 1.02 }}
    className={styles.kpiCard}
  >
    <div className={styles.kpiHeader}>
      <Icon className={styles.kpiIcon} />
      <h3>{title}</h3>
    </div>
    <div className={styles.kpiContent}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className={styles.kpiValue}
      >
        {value}
      </motion.div>
      <div className={styles.kpiProgress}>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
            textColor: '#081e5b',
            trailColor: '#d6d6d6'
          })}
        />
      </div>
    </div>
    <motion.div
      className={`${styles.kpiTrend} ${trend > 0 ? styles.positive : styles.negative}`}
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
    </motion.div>
  </motion.div>
);

export const KPISection = () => {
  const { data: kpiData, isLoading } = useKPIMetrics();

  const kpis = [
    {
      title: 'Total Revenue',
      value: `$${kpiData?.totalRevenue.toFixed(2) || '0'}`,
      percentage: kpiData?.completionRate || 0,
      icon: FaMoneyBillWave,
      trend: 15
    },
    {
      title: 'Average Order Value',
      value: `$${kpiData?.averageOrderValue.toFixed(2) || '0'}`,
      percentage: 75,
      icon: FaChartLine,
      trend: 8
    },
    {
      title: 'Customer Growth',
      value: kpiData?.customerCount || 0,
      percentage: 65,
      icon: FaUsers,
      trend: 12
    }
  ];

  if (isLoading) {
    return <div>Loading KPIs...</div>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className={styles.kpiSection}
    >
      <motion.div className={styles.kpiGrid}>
        {kpis.map((kpi, index) => (
          <KPICard
            key={kpi.title}
            {...kpi}
            custom={index}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};
