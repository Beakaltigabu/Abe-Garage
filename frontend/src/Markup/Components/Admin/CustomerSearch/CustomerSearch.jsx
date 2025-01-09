import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaUserPlus,
  FaEnvelope,
  FaPhone,
  FaChevronRight,
  FaHistory,
  FaTimes,
  FaClock,
} from "react-icons/fa";
import customerService from "../../../../Services/customer.service";
import Loading from "../../../../Markup/Components/Loading/Loading";
import styles from "./CustomerSearch.module.css";

const MAX_RECENT_SEARCHES = 5;

const CustomerSearch = () => {
  const [allCustomers, setAllCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllCustomers();
    loadRecentSearches();
  }, []);

  const loadRecentSearches = () => {
    const saved = localStorage.getItem('recentCustomerSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  };

  const saveRecentSearch = (customer) => {
    const searchEntry = {
      id: customer.customer_id,
      name: `${customer.customer_first_name} ${customer.customer_last_name}`,
      email: customer.customer_email,
      phone: customer.customer_phone_number
    };

    const updated = [searchEntry, ...recentSearches.filter(s => s.id !== customer.customer_id)]
      .slice(0, MAX_RECENT_SEARCHES);
    setRecentSearches(updated);
    localStorage.setItem('recentCustomerSearches', JSON.stringify(updated));
  };

  const fetchAllCustomers = async () => {
    setLoading(true);
    try {
      const response = await customerService.getAllCustomer();
      if (response) {
        setAllCustomers(response.customers);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterCustomers(query);
  };

  const handleRecentSearchClick = (recentSearch) => {
    setSearchQuery(recentSearch.name);
    const customer = allCustomers.find(c => c.customer_id === recentSearch.id);
    if (customer) {
      setFilteredCustomers([customer]);
      setSelectedCustomer(customer);
    }
  };

  const filterCustomers = (query) => {
    if (query) {
      const filtered = allCustomers.filter(
        (customer) =>
          customer?.customer_first_name?.toLowerCase().includes(query.toLowerCase()) ||
          customer?.customer_last_name?.toLowerCase().includes(query.toLowerCase()) ||
          customer?.customer_email?.toLowerCase().includes(query.toLowerCase()) ||
          customer?.customer_phone_number?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCustomers(filtered);
    } else {
      setFilteredCustomers([]);
    }
  };

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
    saveRecentSearch(customer);
  };

  const handleProceed = () => {
    if (selectedCustomer) {
      navigate(`/admin/step-two/${selectedCustomer.customer_id}`);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredCustomers([]);
    setSelectedCustomer(null);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentCustomerSearches');
  };

  return (
    <motion.div
      className={styles.pageWrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className={styles.headerSection}>
        <h1 className={styles.pageTitle}>Create Order: Customer Selection</h1>
        <div className={styles.stepIndicator}>
          <div className={`${styles.step} ${styles.active}`}>
            <span className={styles.stepNumber}>1</span>
            Customer Selection
          </div>
          <div className={styles.step}>
            <span className={styles.stepNumber}>2</span>
            Vehicle Selection
          </div>
          <div className={styles.step}>
            <span className={styles.stepNumber}>3</span>
            Service Details
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.searchPanel}>
          <div className={styles.searchControls}>
            <div className={styles.searchInputWrapper}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search by name, email, or phone..."
                className={styles.searchInput}
              />
              {searchQuery && (
                <button onClick={clearSearch} className={styles.clearButton}>
                  <FaTimes />
                </button>
              )}
            </div>

            <motion.button
              className={styles.addCustomerButton}
              onClick={() => navigate("/admin/add-customer")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaUserPlus />
              New Customer
            </motion.button>
          </div>

          {recentSearches.length > 0 && !searchQuery && (
            <div className={styles.recentSearches}>
              <div className={styles.recentHeader}>
                <div className={styles.recentTitle}>
                  <FaHistory />
                  <span>Recent Searches</span>
                </div>
                <button
                  onClick={clearRecentSearches}
                  className={styles.clearRecentButton}
                >
                  Clear All
                </button>
              </div>
              <div className={styles.recentList}>
                {recentSearches.map((search) => (
                  <motion.button
                    key={search.id}
                    className={styles.recentItem}
                    onClick={() => handleRecentSearchClick(search)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaClock />
                    <span>{search.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={styles.resultsPanel}>
          {loading ? (
            <div className={styles.loadingState}>
              <Loading />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div className={styles.resultsList}>
                {filteredCustomers.map((customer) => (
                  <motion.div
                    key={customer.customer_id}
                    className={`${styles.customerItem} ${
                      selectedCustomer?.customer_id === customer.customer_id ? styles.selected : ''
                    }`}
                    onClick={() => handleCustomerSelect(customer)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className={styles.customerInfo}>
                      <div className={styles.customerMain}>
                        <div className={styles.customerInitials}>
                          {customer.customer_first_name[0]}{customer.customer_last_name[0]}
                        </div>
                        <div className={styles.customerDetails}>
                          <h3>{customer.customer_first_name} {customer.customer_last_name}</h3>
                          <div className={styles.contactDetails}>
                            <span><FaEnvelope /> {customer.customer_email}</span>
                            <span><FaPhone /> {customer.customer_phone_number}</span>
                          </div>
                        </div>
                      </div>
                      <FaChevronRight className={styles.selectArrow} />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {selectedCustomer && (
            <motion.div
              className={styles.selectedCustomerBar}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <div className={styles.selectedInfo}>
                <span>Selected:</span>
                <strong>{selectedCustomer.customer_first_name} {selectedCustomer.customer_last_name}</strong>
              </div>
              <motion.button
                className={styles.proceedButton}
                onClick={handleProceed}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Proceed to Vehicle Selection <FaChevronRight />
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CustomerSearch;
