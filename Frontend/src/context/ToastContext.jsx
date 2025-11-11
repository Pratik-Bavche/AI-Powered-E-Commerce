import React, { createContext, useState, useCallback } from 'react';

export const toastContext = createContext();

const ToastContext = ({ children }) => {
  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    type: 'success', // 'success', 'error', 'info'
  });

  const showToast = useCallback((message, type = 'success') => {
    setToast({
      isVisible: true,
      message,
      type,
    });
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => ({
      ...prev,
      isVisible: false,
    }));
  }, []);

  const value = {
    ...toast,
    showToast,
    hideToast,
  };

  return (
    <toastContext.Provider value={value}>
      {children}
    </toastContext.Provider>
  );
};

export default ToastContext;
