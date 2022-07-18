import React, { useCallback, useContext, useMemo, useState } from 'react';
import Toast, { ToastType } from './Toast';

type AddToastProps = {
  variant: string;
  title: string;
  text: string;
};

// Toasts logic: https://www.claritician.com/how-to-implement-toast-notifications-in-react-using-hooks
const ToastsContext = React.createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addToast: (props: AddToastProps) => {
    throw new Error('To add a toast, wrap the app in a ToastsProvider.');
  },
});

const generateToastId = () => {
  return Math.random().toString(36).substring(2, 9);
};

const ToastLayout = ({ children }: { children: any }) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const addToast = useCallback((props: AddToastProps) => {
    const toastId = generateToastId();
    const { variant, title, text } = props;

    const toast = {
      id: toastId,
      variant,
      title,
      text,
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
    // @ts-ignore
    <ToastsContext.Provider value={contextValue}>
      {children}
      <div className="mt-[75px] absolute right-0 overflow-hidden">
        <div className="flex flex-col gap-4">
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
