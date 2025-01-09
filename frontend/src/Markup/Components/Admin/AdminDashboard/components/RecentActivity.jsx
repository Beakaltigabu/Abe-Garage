import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { FaCircle, FaFilter, FaSearch } from 'react-icons/fa';
import { useRecentActivity } from '../../../../../hooks/useDashboardData';
import styles from './RecentActivity.module.css';

const ITEMS_PER_PAGE = 5;

const activityVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5
    }
  }),
  exit: { opacity: 0, x: -20 }
};

const ActivityItem = ({ activity, index }) => {
  const getStatusColor = (status) => {
    const colors = {
      completed: '#4CAF50',
      pending: '#FFC107',
      cancelled: '#F44336'
    };
    return colors[status.toLowerCase()] || '#757575';
  };

  return (
    <motion.div
      variants={activityVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      custom={index}
      className={styles.activityItem}
      whileHover={{ scale: 1.02, x: 10 }}
    >
      <div className={styles.activityIcon}>
        <FaCircle color={getStatusColor(activity.status)} />
      </div>
      <div className={styles.activityContent}>
        <h4>Order #{activity.id}</h4>
        <p>Order status: {activity.status}</p>
        <div className={styles.activityMeta}>
          <span>{format(parseISO(activity.date), 'MMM dd, yyyy HH:mm')}</span>
          <span className={styles.activityAmount}>${parseFloat(activity.amount).toFixed(2)}</span>
        </div>
      </div>
    </motion.div>
  );
};

export const RecentActivity = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const { data: activities, isLoading } = useRecentActivity();

  const filteredActivities = activities?.filter(activity => {
    const matchesSearch =
      activity.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.id.toString().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filter === 'all' ||
      activity.status.toLowerCase() === filter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  const displayedActivities = filteredActivities?.slice(0, visibleItems);
  const hasMore = filteredActivities?.length > visibleItems;

  const handleLoadMore = () => {
    setVisibleItems(prev => prev + ITEMS_PER_PAGE);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.recentActivityContainer}
    >
      <div className={styles.activityHeader}>
        <h2>Recent Activity</h2>
        <div className={styles.activityControls}>
          <motion.div className={styles.searchBar}>
            <FaSearch />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleItems(ITEMS_PER_PAGE); // Reset visible items when searching
              }}
            />
          </motion.div>
          <motion.div className={styles.filterDropdown}>
            <FaFilter />
            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setVisibleItems(ITEMS_PER_PAGE); // Reset visible items when filtering
              }}
            >
              <option value="all">All Orders</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </motion.div>
        </div>
      </div>

      <motion.div className={styles.activityList}>
        <AnimatePresence mode="sync">
          {isLoading ? (
            <motion.div className={styles.loadingState}>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className={styles.loadingItem}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    transition: { duration: 1.5, repeat: Infinity }
                  }}
                />
              ))}
            </motion.div>
          ) : (
            displayedActivities?.map((activity, index) => (
              <ActivityItem
                key={activity.id}
                activity={activity}
                index={index}
              />
            ))
          )}
        </AnimatePresence>
      </motion.div>

      {hasMore && (
        <motion.button
          className={styles.loadMoreButton}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLoadMore}
        >
          Load More
        </motion.button>
      )}
    </motion.div>
  );
};
