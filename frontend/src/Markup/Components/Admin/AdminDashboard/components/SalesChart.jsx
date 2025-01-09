import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useSalesData } from '../../../../../hooks/useDashboardData';
import styles from './SalesChart.module.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 }
  }
};

export const SalesChart = () => {
  const [timeframe, setTimeframe] = useState('monthly');
  const { data: salesData, isLoading } = useSalesData(timeframe);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Time Period'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Revenue ($)'
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true
      }
    }
  };

  const chartData = {
    labels: salesData?.labels || [],
    datasets: [{
      label: 'Sales Revenue',
      data: salesData?.datasets[0].data || [],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
      backgroundColor: 'rgba(75, 192, 192, 0.5)'
    }]
  };

  return (
    <motion.div
      className={styles.chartContainer}
      variants={chartVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={styles.chartHeader}>
        <h2>Sales Overview</h2>
        <div className={styles.timeframeControls}>
          {['weekly', 'monthly', 'yearly'].map((tf) => (
            <motion.button
              key={tf}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${styles.timeframeButton} ${timeframe === tf ? styles.active : ''}`}
              onClick={() => setTimeframe(tf)}
            >
              {tf.charAt(0).toUpperCase() + tf.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={timeframe}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isLoading ? (
            <div className={styles.loading}>Loading sales data...</div>
          ) : (
            <Line data={chartData} options={chartOptions} />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
