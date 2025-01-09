import React, { createContext, useContext, useReducer, useCallback } from 'react';

const DashboardContext = createContext();

const initialState = {
  timeframe: 'monthly',
  dateRange: 'thisYear',
  filters: {
    status: 'all',
    category: 'all'
  },
  refreshInterval: 30000,
  layout: 'default',
  theme: 'light'
};

const dashboardReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TIMEFRAME':
      return { ...state, timeframe: action.payload };
    case 'SET_DATE_RANGE':
      return { ...state, dateRange: action.payload };
    case 'UPDATE_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };
    case 'SET_REFRESH_INTERVAL':
      return { ...state, refreshInterval: action.payload };
    case 'UPDATE_LAYOUT':
      return { ...state, layout: action.payload };
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light'
      };
    default:
      return state;
  }
};

export const DashboardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  const setTimeframe = useCallback((timeframe) => {
    dispatch({ type: 'SET_TIMEFRAME', payload: timeframe });
  }, []);

  const setDateRange = useCallback((range) => {
    dispatch({ type: 'SET_DATE_RANGE', payload: range });
  }, []);

  const updateFilters = useCallback((filters) => {
    dispatch({ type: 'UPDATE_FILTERS', payload: filters });
  }, []);

  const setRefreshInterval = useCallback((interval) => {
    dispatch({ type: 'SET_REFRESH_INTERVAL', payload: interval });
  }, []);

  const updateLayout = useCallback((layout) => {
    dispatch({ type: 'UPDATE_LAYOUT', payload: layout });
  }, []);

  const toggleTheme = useCallback(() => {
    dispatch({ type: 'TOGGLE_THEME' });
  }, []);

  const value = {
    ...state,
    setTimeframe,
    setDateRange,
    updateFilters,
    setRefreshInterval,
    updateLayout,
    toggleTheme
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
