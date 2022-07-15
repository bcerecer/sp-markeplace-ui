import React from 'react';
import Toast from './Toast';

const ToastLayout = () => {
  return (
    <div className="h-full absolute right-0">
      <div className="flex flex-col gap-4">
        <Toast />
      </div>
    </div>
  );
};

export default ToastLayout;
