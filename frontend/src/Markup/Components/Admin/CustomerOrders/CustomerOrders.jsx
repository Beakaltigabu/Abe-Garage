import React, { useState, useEffect } from 'react';
import { Table, Badge, Pagination } from 'react-bootstrap';
import { FaExternalLinkAlt, FaEdit } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrdersByCustomerId } from '../../../../Services/order.service';
import customerService from '../../../../Services/customer.service';
import Loading from '../../Loading/Loading';
import styles from './CustomerOrders.module.css';

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const ordersPerPage = 5;
  const navigate = useNavigate();
  const { customer_id } = useParams();

  useEffect(() => {
    fetchCustomerAndOrders(currentPage);
  }, [currentPage, customer_id]);

  const fetchCustomerAndOrders = async (page) => {
    try {
      setLoading(true);
      const [customerData, ordersData] = await Promise.all([
        customerService.getSingleCustomer(customer_id),
        getOrdersByCustomerId(customer_id, {
          page,
          limit: ordersPerPage,
          sortby: 'order_date DESC'
        })
      ]);


      setCustomer(customerData.customer);
      setOrders(ordersData.orders);
      setTotalPages(Math.ceil(ordersData.total / ordersPerPage));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge bg="success">Completed</Badge>;
      case 'inprogress':
        return <Badge bg="warning" text="dark">In Progress</Badge>;
      case 'received':
      default:
        return <Badge bg="secondary">Received</Badge>;
    }
  };

  const handleView = (orderId) => {
    navigate(`/admin/orders/view/${orderId}`);
  };

  const handleEdit = (orderId) => {
    navigate(`/admin/orders/edit/${orderId}`);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Orders of {customer ? `${customer.customer_first_name} ${customer.customer_last_name}` : 'Customer'}

      </h2>
      {orders.length > 0 ? (
        <>
          <Table striped bordered hover responsive="md" className={styles.orderTable}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Total Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.order_id}>
                  <td>{order.order_id}</td>
                  <td>{new Date(order.order_date).toLocaleDateString()}</td>
                  <td>{getStatusBadge(order.order_status)}</td>
                  <td>${order.order_total_price.toFixed(2)}</td>
                  <td>
                    <FaExternalLinkAlt className={styles.actionIcon} onClick={() => handleView(order.order_id)} />
                    <FaEdit className={styles.actionIcon} onClick={() => handleEdit(order.order_id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination className={styles.pagination}>
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {[...Array(totalPages).keys()].map((number) => (
              <Pagination.Item
                key={number + 1}
                active={number + 1 === currentPage}
                onClick={() => handlePageChange(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </>
      ) : (
        <p className={styles.noOrders}>No orders found for this customer.</p>
      )}
    </div>
  );
};

export default CustomerOrders;
