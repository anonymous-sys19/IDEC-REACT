/* eslint-disable react/prop-types */
import  { useEffect } from "react";
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const Notification = ({ message, duration, backgroundColor, success }) => {
  useEffect(() => {
    const showToast = () => {
      Toastify({
        text: message,
        duration,
        gravity: 'bottom',
        position: 'right',
        close: true,
        style: {
          background: backgroundColor, // Cambiar a style.background
        },
      }).showToast();
    };

    if (success !== undefined) {
      showToast();
    }
  }, [message, duration, backgroundColor, success]);

  return null;
};

export const SuccessNotification = ({ message, success }) => {
  return <Notification message={message} duration={3000} backgroundColor="#4CAF50" success={success} />;
};

export const ErrorNotification = ({ message, success }) => {
  return <Notification message={message} duration={3000} backgroundColor="#FF5722" success={success} />;
};

export const WarningNotification = ({ message, success }) => {
  return <Notification message={message} duration={3000} backgroundColor="#FFC107" success={success} />;
};
