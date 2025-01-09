import { useQuery, useQueryClient } from 'react-query';
import {getOrders} from '../Services/order.service';
import customerService from '../Services/customer.service';
import EmployeeService from '../Services/employee.service';
import * as serviceService from '../Services/service.service';
import { startOfMonth, endOfMonth, parseISO, subMonths } from 'date-fns';

// Dashboard Stats Hook
export const useStats = () => {
  return useQuery('dashboardStats', async () => {
    const [orders, customers, employees, services] = await Promise.all([
      getOrders(),
      customerService.getAllCustomer(),
      EmployeeService.getAllEmployee(),
      serviceService.getActiveServices()
    ]);

    return {
      orders: orders.orders?.length || 0,
      customers: customers.customers?.length || 0,
      employees: employees.employees?.length || 0,
      services: services.services?.length || 0
    };
  });
};

// Sales Data Hook
export const useSalesData = (timeframe = 'monthly') => {
  return useQuery(['salesData', timeframe], async () => {
    const orders = await getOrders();
    const currentDate = new Date();
    const lastMonth = subMonths(currentDate, 1);

    const monthlyData = orders.orders.reduce((acc, order) => {
      const orderDate = parseISO(order.order_date);
      const monthKey = orderDate.toLocaleString('default', { month: 'short' });

      acc[monthKey] = (acc[monthKey] || 0) + parseFloat(order.order_total_price || 0);
      return acc;
    }, {});

    return {
      labels: Object.keys(monthlyData),
      datasets: [{
        data: Object.values(monthlyData),
        label: 'Monthly Sales'
      }]
    };
  });
};

// KPI Data Hook
export const useKPIMetrics = () => {
  return useQuery('kpiMetrics', async () => {
    const orders = await getOrders();
    const customers = await customerService.getAllCustomer();

    const totalRevenue = orders.orders.reduce((sum, order) =>
      sum + parseFloat(order.order_total_price || 0), 0);

    const completedOrders = orders.orders.filter(order =>
      order.order_status === 'completed').length;

    return {
      totalRevenue,
      averageOrderValue: totalRevenue / orders.orders.length,
      completionRate: (completedOrders / orders.orders.length) * 100,
      customerCount: customers.customers.length
    };
  });
};

// Employee Performance Hook
export const useEmployeePerformance = () => {
  return useQuery('employeePerformance', async () => {
    const [orders, employees] = await Promise.all([
      getOrders(),
      EmployeeService.getAllEmployee()
    ]);

    const performanceData = employees.employees.map(employee => {
      const employeeOrders = orders.orders.filter(order =>
        order.employee_id === employee.employee_id);

      const completedOrders = employeeOrders.filter(order =>
        order.order_status === 'completed');

      const revenue = employeeOrders.reduce((sum, order) =>
        sum + parseFloat(order.order_total_price || 0), 0);

      return {
        id: employee.employee_id,
        name: `${employee.employee_first_name} ${employee.employee_last_name}`,
        completedOrders: completedOrders.length,
        totalOrders: employeeOrders.length,
        revenue
      };
    });

    return performanceData.sort((a, b) => b.revenue - a.revenue);
  });
};

// Service Analytics Hook
export const useServiceAnalytics = () => {
  return useQuery('serviceAnalytics', async () => {
    const [orders, services] = await Promise.all([
      getOrders(),
      serviceService.getActiveServices()
    ]);

    const serviceUsage = services.services.map(service => {
      const serviceOrders = orders.orders.filter(order =>
        order.service_id === service.service_id);

      return {
        id: service.service_id,
        name: service.service_name,
        orderCount: serviceOrders.length,
        revenue: serviceOrders.reduce((sum, order) =>
          sum + parseFloat(order.order_total_price || 0), 0)
      };
    });

    return serviceUsage.sort((a, b) => b.orderCount - a.orderCount);
  });
};

// Recent Activity Hook
export const useRecentActivity = (limit = 5) => {
  return useQuery('recentActivity', async () => {
    const orders = await getOrders();

    return orders.orders
      .sort((a, b) => new Date(b.order_date) - new Date(a.order_date))
      .slice(0, limit)
      .map(order => ({
        id: order.order_id,
        type: 'order',
        status: order.order_status,
        date: order.order_date,
        amount: order.order_total_price,
        customer_id: order.customer_id
      }));
  });
};

// Export utility functions for direct API calls
export const dashboardAPI = {
  fetchStats: () => Promise.all([
    getOrders(),
    customerService.getAllCustomer(),
    EmployeeService.getAllEmployee(),
    serviceService.getActiveServices()
  ]),

  fetchSalesData: () => getOrders(),

  fetchKPIData: () => Promise.all([
    getOrders(),
    customerService.getAllCustomer()
  ]),

  fetchEmployeePerformance: () => Promise.all([
    getOrders(),
    EmployeeService.getAllEmployee()
  ]),

  fetchServiceAnalytics: () => Promise.all([
    getOrders(),
    serviceService.getActiveServices()
  ])
};
