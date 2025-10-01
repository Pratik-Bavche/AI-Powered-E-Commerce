import React, { useEffect, useState } from 'react';

const Toast = ({ message, type = 'success', isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto close after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`px-6 py-3 rounded-lg shadow-lg text-white font-medium ${
        type === 'success' ? 'bg-green-600' : 
        type === 'error' ? 'bg-red-600' : 
        'bg-blue-600'
      }`}>
        {message}
      </div>
    </div>
  );
};

export default Toast;
