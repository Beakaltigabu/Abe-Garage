import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import { FaClipboardList, FaUsers, FaUserTie, FaCogs } from 'react-icons/fa';
import { useStats } from '../../../../../hooks/useDashboardData';
import styles from './StatCards.module.css';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut'
    }
  })
};

const StatCard = ({ icon: Icon, title, value, link, index }) => (
  <motion.div
    custom={index}
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    whileHover={{ scale: 1.02, translateY: -5 }}
    className={styles.statCard}
  >
    <div className={styles.iconWrapper}>
      <Icon className={styles.icon} />
    </div>
    <div className={styles.content}>
      <h3>{title}</h3>
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className={styles.value}
      >
        {value}
      </motion.span>
    </div>
  </motion.div>
);

export const StatCards = () => {
  const { data: statsData, isLoading } = useStats();

  const stats = [
    { icon: FaClipboardList, title: 'Total Orders', value: statsData?.orders || 0 },
    { icon: FaUsers, title: 'Customers', value: statsData?.customers || 0 },
    { icon: FaUserTie, title: 'Employees', value: statsData?.employees || 0 },
    { icon: FaCogs, title: 'Services', value: statsData?.services || 0 }
  ];

  if (isLoading) {
    return <div className={styles.loading}>Loading statistics...</div>;
  }

  return (
    <div className={styles.statsGrid}>
      {stats.map((stat, index) => (
        <StatCard key={stat.title} {...stat} index={index} />
      ))}
    </div>
  );
};
