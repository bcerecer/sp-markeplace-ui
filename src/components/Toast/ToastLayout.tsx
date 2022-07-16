import React, { useCallback, useContext, useMemo, useState } from 'react';
import Toast from './Toast';

// Toasts logic: https://www.claritician.com/how-to-implement-toast-notifications-in-react-using-hooks
const ToastsContext = React.createContext({
  addToast: () => {
    throw new Error('To add a toast, wrap the app in a ToastsProvider.');
  },
});

const generateToastId = () => {
  return Math.random().toString(36).substring(2, 9);
};

const ToastLayout = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((content, options = {}) => {
    const { autoDismiss = true } = options;
    const toastId = generateToastId();

    const toast = {
      id: toastId,
      content,
      autoDismiss,
      remove: () => {
        setToasts((latestToasts) => latestToasts.filter(({ id }) => id !== toastId));
      },
    };

    setToasts((latestToasts) => [...latestToasts, toast]);
  }, []);

  const contextValue = useMemo(
    () => ({
      addToast,
    }),
    [addToast]
  );

  return (
    <ToastsContext.Provider value={contextValue}>
      {children}
      <div className="h-full absolute right-0">
        {/* mt-[75px] is hot fix to not overflow Navbar */}
        <div className="mt-[75px] flex flex-col gap-4 overflow-hidden	">
          {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} />
          ))}
        </div>
      </div>
    </ToastsContext.Provider>
  );
};

export const useToasts = () => {
  return useContext(ToastsContext);
};

export default ToastLayout;
